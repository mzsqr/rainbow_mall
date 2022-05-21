package pro.lingwu.rainbowmall.dto.db;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.sql.Timestamp;

/**
 * @author @lingwu
 * @date created in 12/8/2021
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel
public class Order {

    private long id;

    /**
     * 商品的状态 <br/>
     * 0 - 购物车<br/>
     * 1 - 待付款<br/>
     * 2 - 待发货<br/>
     * 3 - 取消付款<br/>
     * 4 - 已发货<br/>
     * 5 - 已收货<br/>
     * 6 - 退货<br/>
     * 7 - 退货成功<br/>
     */
    private Integer status;

    private String goodsId;

    private String account;

    private Integer num;

    private Goods goods;

    private Integer orgPrice;

    private Boolean checked;

    private Timestamp orderTime;

    private String address;

}
