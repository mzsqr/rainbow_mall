package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import pro.lingwu.rainbowmall.dto.db.Order;
import pro.lingwu.rainbowmall.dto.db.Stat;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/8/2021
 */
@Mapper
public interface OrderMapper {

    void addOrder(Order order);

    List<Order> findOrderByUserAccount(@Param("account") String account);

    List<Order> findAllOrder();

    Order findOrderByID(long id);

    void deleteOrderById(long id);

    void updateOrder(Order order);

    long getTotalForAccount(String account);
    long getTotalForAccountOuted(String account);
    long getTotalForAccountNotOut(String account);

    List<Order> getOrdersForBuyer(String account);

    long getOrdersForBuyerTotal(String account);

    long getTotal();

    Order getOrderByAccountAndGoods(@Param("account") String account, @Param("goodsId") String goodsId);

    Order getOrderByAccountAndGoodsWithinCart(@Param("account") String account, @Param("goodsId") String goodsId);

    Stat getOrderTodayStat();

    List<Stat> getOrdersStat();

    List<Order> getOutOrder(String account);

    List<Order> getNotOutOrder(String account);

}
