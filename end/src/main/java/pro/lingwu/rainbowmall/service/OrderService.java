package pro.lingwu.rainbowmall.service;

import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Order;
import pro.lingwu.rainbowmall.dto.db.Stat;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
public interface OrderService {

    void addOrder(Order order);

    void updateOrder(Order order, WebContext context) throws MessagingException;

    void rmOrder(long id);

    PagesResult<Order> findOrderByAccount(String account, int start, int size);

    PagesResult<Order> findOrders(int start, int size);

    long getOrderNumFor(String account);

    PagesResult<Order> getOrdersForBuyer(String account, int start, int size);

    void tipUser(Order order, WebContext context) throws MessagingException;

    Stat getTodayStat();

    List<Stat> getStats();

    void buyGoods(String account, List<Order> orders) throws PasswordVerifyFailed;

    List<Order> getOutGoods(String account);

    List<Order> getNotOutGoods(String account);
    Long getOutGoodsNum(String account);

    Long getNotOutGoodsNum(String account);
}
