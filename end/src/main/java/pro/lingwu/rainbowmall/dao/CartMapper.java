package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import pro.lingwu.rainbowmall.dto.db.Cart;
import pro.lingwu.rainbowmall.dto.db.Goods;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Mapper
public interface CartMapper {

    /**
     * 获取某个账号下购物车中的所有商品
     * @param account 账号
     * @return 商品列表
     */
    List<Goods> getCartByAccount(String account);

}
