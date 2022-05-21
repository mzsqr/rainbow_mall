package pro.lingwu.rainbowmall.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dao.GoodsMapper;
import pro.lingwu.rainbowmall.dao.PhotoMapper;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Goods;
import pro.lingwu.rainbowmall.dto.db.Photo;
import pro.lingwu.rainbowmall.service.GoodsService;
import pro.lingwu.rainbowmall.utils.FileUtils;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author @lingwu
 * @date created in 11/25/2021
 */
@Service
public class GoodsServiceImpl implements GoodsService {

    private final GoodsMapper goodsMapper;
    private final PhotoMapper photoMapper;
    private final FileUtils fileUtils;

    public GoodsServiceImpl(GoodsMapper goodsMapper, PhotoMapper photoMapper, FileUtils fileUtils) {
        this.goodsMapper = goodsMapper;
        this.photoMapper = photoMapper;
        this.fileUtils = fileUtils;
    }


    @Override
    @Transactional
    public void addGoods(Goods goods, List<MultipartFile> photos) throws IOException {
        String gid = UUID.randomUUID().toString().replace("-","");
        goods.setId(gid);
        goods.setAddDate(Date.valueOf(LocalDate.now()));
        goods.setExample(photos.get(0).getOriginalFilename());
        goodsMapper.addGoods(goods);
        photos.forEach(photo->{
            Photo photo1 = new Photo();
            photo1.setGId(gid);
            photo1.setPname(photo.getOriginalFilename());
            photoMapper.addPhoto(photo1);
        });
        for (MultipartFile photo :photos) {
            fileUtils.storePhoto("/" + goods.getAccount()
                    + "/" + goods.getId(), photo);
        }
    }

    @Override
    public PagesResult<Goods> getSomeGoods(String account, int start, int size) {
        var page = PageHelper.startPage(start, size);
        var res = new PagesResult<Goods>();
        res.setResult(goodsMapper.getGoodsesByAccount(account));
        page.close();
        res.setTotal(goodsMapper.getGoodsNum(account));
        return res;
    }

    @Override
    public Goods getGoodsBy(String id) {
        return goodsMapper.getGoodsById(id);
    }

    @Override
    @Transactional
    public void rmGoods(String id) throws IOException {
/*        Goods goods = goodsMapper.getGoodsById(id);
        String path = "/" + goods.getAccount() + "/" + goods.getId();*/
/*        for (var photo : goods.getPhotos()) {
            fileUtils.rmPhoto(path, photo.getPname());
        }
        fileUtils.rmGoodsDir(path);*/
        photoMapper.rmPhotosByGoods(id);
        goodsMapper.rmGoods(id);
    }

    @Override
    public void updateGoods(Goods goods) {
        goodsMapper.updateGoods(goods);
    }

    @Override
    public List<Goods> getGoods(int start, int size) {
        Page<List<Goods>> page = PageHelper.startPage(start, size);
        var res =  goodsMapper.getGoodses();
        page.close();
        return res;
    }

    @Override
    public List<Goods> searchGoods(List<String> keywords, Integer start, Integer size) {
        /*var list = new ArrayList<String>();
        for (var item :
                keywords) {
            list.add("%"+item+ "%");
        }*/
        return goodsMapper.searchGoods(keywords);
    }
}
