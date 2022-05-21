package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import pro.lingwu.rainbowmall.dto.db.Goods;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Mapper
public interface GoodsMapper {

    Goods getSomeGoods(String id);

    void addGoods(Goods goods);

    Goods getGoodsById(String id);

    List<Goods> getGoodsesByAccount(String account);

    void rmGoods(String id);

    void updateGoods(Goods goods);

    long getGoodsNum(String account);

    List<Goods> getGoodses();

    String getSellerByGoods(String id);

    List<Goods> searchGoods(List<String> keywords);
}
