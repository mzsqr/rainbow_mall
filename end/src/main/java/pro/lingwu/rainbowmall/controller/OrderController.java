package pro.lingwu.rainbowmall.controller;

import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Order;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;
import pro.lingwu.rainbowmall.service.OrderService;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Api
@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order")
    public ResponseEntity<?> addOrder(Order order){
        order.setOrderTime(new Timestamp(System.currentTimeMillis()));
        orderService.addOrder(order);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/order/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable long id, Order order,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws MessagingException {
        WebContext con = new WebContext(request,
                response, request.getServletContext());
        order.setId(id);
        orderService.updateOrder(order, con);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<?> rmOrder(@PathVariable long id){
        orderService.rmOrder(id);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/order")
    public ResponseEntity<?> getOrders(String account, int start, int size){
        PagesResult<Order> orders = null;
        if (account == null) {
            orders = orderService.findOrders(start, size);
        }else {
            orders = orderService.findOrderByAccount(account, start, size);
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/order/stat-today")
    public ResponseEntity<?> getOrdersStatToday(){
        return ResponseEntity.ok(orderService.getTodayStat());
    }

    @GetMapping("/order/stat")
    public ResponseEntity<?> getOrderStat(){
        return ResponseEntity.ok(orderService.getStats());
    }

    @GetMapping("/buyer/order")
    public ResponseEntity<?> getOrdersForBuyer(String account, int start, int size){
        return ResponseEntity.ok(orderService.getOrdersForBuyer(account, start, size));
    }

    @GetMapping("/buyer/order/outed")
    public ResponseEntity<?> getOrdersForBuyerOuted(String account){
        return ResponseEntity.ok(orderService.getOutGoods(account));
    }

    @GetMapping("/buyer/order/not-out")
    public ResponseEntity<?> getOrdersForBuyerNotOut(String account){
        return ResponseEntity.ok(orderService.getNotOutGoods(account));
    }

    @GetMapping("/buyer/order/outed-num")
    public ResponseEntity<?> getOrdersForBuyerOutedNum(String account){
        return ResponseEntity.ok(orderService.getOutGoodsNum(account));
    }

    @GetMapping("/buyer/order/not-out-num")
    public ResponseEntity<?> getOrdersForBuyerNotOutNum(String account){
        return ResponseEntity.ok(orderService.getNotOutGoodsNum(account));
    }

    @GetMapping("/order-num")
    public ResponseEntity<?> getOrderNumForm(String account){
        return ResponseEntity.ok(orderService.getOrderNumFor(account));
    }

    @PostMapping("/buyer/order/tip")
    public ResponseEntity<?> tipUser(Order order,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws MessagingException {
        orderService.tipUser(order, new WebContext(request, response, request.getServletContext()));
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/order/buy/{account}")
    public ResponseEntity<?> buyGoods(@PathVariable String account,
                                      @RequestBody List<Order> orders) throws PasswordVerifyFailed {
        orderService.buyGoods(account, orders);
        return ResponseEntity.ok("ok");
    }

}
