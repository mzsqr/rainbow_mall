package pro.lingwu.rainbowmall.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dao.GoodsMapper;
import pro.lingwu.rainbowmall.dao.OrderMapper;
import pro.lingwu.rainbowmall.dao.UserManageRecordMapper;
import pro.lingwu.rainbowmall.dao.UserMapper;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.*;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;
import pro.lingwu.rainbowmall.service.OrderService;
import pro.lingwu.rainbowmall.utils.MailUtils;
import pro.lingwu.rainbowmall.utils.Status;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderMapper orderMapper;
    private final GoodsMapper goodsMapper;
    private final UserMapper userMapper;
    private final MailUtils mailUtils;

    private final UserManageRecordMapper recordMapper;

    public OrderServiceImpl(OrderMapper orderMapper, GoodsMapper goodsMapper, UserMapper userMapper, MailUtils mailUtils, UserManageRecordMapper recordMapper) {
        this.orderMapper = orderMapper;
        this.goodsMapper = goodsMapper;
        this.userMapper = userMapper;
        this.mailUtils = mailUtils;
        this.recordMapper = recordMapper;
    }


    @Override
    public void addOrder(Order order) {
        Order origin = orderMapper.getOrderByAccountAndGoodsWithinCart(order.getAccount(), order.getGoodsId());
        if (origin == null || origin.getStatus()>1) {
            orderMapper.addOrder(order);

            UserMangeRecord record = new UserMangeRecord(
                    order.getAccount(), LocalDateTime.now().toString(),
                    Status.INSTANCE.getActions().get(Status.InCart)
            );
            recordMapper.addRecord(record);
        }else {
            origin.setNum(order.getNum()+ origin.getNum());
            orderMapper.updateOrder(origin);
        }
    }

    @Override
    public void updateOrder(Order order, WebContext context) throws MessagingException {
        if(order.getStatus() == 4){
            // 发送邮件
            var request = context.getRequest();
            request.setAttribute("goodsUrl",
                    "https://lingwu.pro/mall/app/goods/"+order.getGoodsId());
            Goods goods = goodsMapper.getGoodsById(order.getGoodsId());
            request.setAttribute("goodsTitle", goods.getTitle());
            User user = userMapper.findUserBy(order.getAccount());
            mailUtils.sendTo(user.getEmail(), "outingGoods", context, "RainbowMall的发货提醒");
        }else {
            UserMangeRecord record = new UserMangeRecord(
                    order.getAccount(), LocalDateTime.now().toString(),
                    Status.INSTANCE.getActions().get(order.getStatus())
            );
            recordMapper.addRecord(record);
        }
        orderMapper.updateOrder(order);
    }

    @Override
    public void rmOrder(long id) {
        orderMapper.deleteOrderById(id);
    }

    @Override
    public PagesResult<Order> findOrderByAccount(String account, int start, int size) {
//        PageHelper.startPage(start, size);
        var res = new PagesResult<Order>();
        res.setResult(orderMapper.findOrderByUserAccount(account));
        res.setTotal(orderMapper.getTotalForAccount(account));
        return res;
    }

    @Override
    public PagesResult<Order> findOrders(int start, int size) {
//        PageHelper.startPage(start, size);
        var res = new PagesResult<Order>();
        res.setResult(orderMapper.findAllOrder());
        res.setTotal(orderMapper.getTotal());
        return res;
    }

    @Override
    public long getOrderNumFor(String account) {
        return orderMapper.getTotalForAccount(account);
    }

    @Override
    public PagesResult<Order> getOrdersForBuyer(String account, int start, int size) {
        var page = PageHelper.startPage(start, size);
        PagesResult<Order> res = new PagesResult<>();
        res.setResult(orderMapper.getOrdersForBuyer(account));
        page.close();
        res.setTotal(orderMapper.getOrdersForBuyerTotal(account));
        return res;
    }

    @Override
    public void tipUser(Order order, WebContext context) throws MessagingException {
        var request = context.getRequest();
        request.setAttribute("goodsUrl",
                "https://lingwu.pro/mall/app/goods/"+order.getGoodsId());
        Goods goods = goodsMapper.getGoodsById(order.getGoodsId());
        request.setAttribute("goodsTitle", goods.getTitle());
        User user = userMapper.findUserBy(order.getAccount());
        mailUtils.sendTo(user.getEmail(), "tipUser", context, "RainbowMall的收货提醒");
    }

    @Override
    public Stat getTodayStat() {
        return orderMapper.getOrderTodayStat();
    }

    @Override
    public List<Stat> getStats() {
        return orderMapper.getOrdersStat();
    }

    @Override
    @Transactional
    public void buyGoods(String account, List<Order> orders) throws PasswordVerifyFailed {
        var user = userMapper.findUserBy(account);
        if (user == null) {
            throw new PasswordVerifyFailed();
        }
        for (var order: orders) {
            String to = goodsMapper.getSellerByGoods(order.getGoodsId());
            userMapper.changeMoney(order.getOrgPrice()*order.getNum(), to);
            userMapper.changeMoney(-order.getOrgPrice()*order.getNum(), user.getAccount());
            order.setStatus(2);
            orderMapper.updateOrder(order);

            // 增加一条 日志记录
            UserMangeRecord record = new UserMangeRecord(account,
                    LocalDateTime.now().toString(), Status.INSTANCE.getActions().get(2));
            recordMapper.addRecord(record);
        }
    }

    @Override
    public List<Order> getOutGoods(String account) {
        return orderMapper.getOutOrder(account);
    }

    @Override
    public List<Order> getNotOutGoods(String account) {
        return orderMapper.getNotOutOrder(account);
    }

    @Override
    public Long getOutGoodsNum(String account) {
        return orderMapper.getTotalForAccountOuted(account);
    }

    @Override
    public Long getNotOutGoodsNum(String account) {
        return orderMapper.getTotalForAccountNotOut(account);
    }
}
