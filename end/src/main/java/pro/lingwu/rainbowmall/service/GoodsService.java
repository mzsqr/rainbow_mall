package pro.lingwu.rainbowmall.service;

import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Goods;
import pro.lingwu.rainbowmall.dto.db.Photo;

import java.io.IOException;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/25/2021
 */
public interface GoodsService {

    void addGoods(Goods goods, List<MultipartFile> photos) throws IOException;

    PagesResult<Goods> getSomeGoods(String account, int start, int size);

    Goods getGoodsBy(String id);

    void rmGoods(String id) throws IOException;

    void updateGoods(Goods goods);

    List<Goods> getGoods(int start, int size);

    List<Goods> searchGoods(List<String> keywords,Integer start, Integer size);
}
