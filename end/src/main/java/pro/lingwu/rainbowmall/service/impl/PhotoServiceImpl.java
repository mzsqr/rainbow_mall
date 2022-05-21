package pro.lingwu.rainbowmall.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dao.GoodsMapper;
import pro.lingwu.rainbowmall.dao.PhotoMapper;
import pro.lingwu.rainbowmall.dto.db.Goods;
import pro.lingwu.rainbowmall.dto.db.Photo;
import pro.lingwu.rainbowmall.service.PhotoService;
import pro.lingwu.rainbowmall.utils.FileUtils;

import java.io.IOException;

/**
 * @author @lingwu
 * @date created in 12/10/2021
 */
@Service
public class PhotoServiceImpl implements PhotoService{
    private final PhotoMapper photoMapper;
    private final FileUtils fileUtils;
    private final GoodsMapper goodsMapper;

    public PhotoServiceImpl(PhotoMapper photoMapper, FileUtils fileUtils, GoodsMapper goodsMapper) {
        this.photoMapper = photoMapper;
        this.fileUtils = fileUtils;
        this.goodsMapper = goodsMapper;
    }

    @Override
    public void rmPhoto(long id) {
        photoMapper.rmPhotoById(id);
    }

    @Override
    @Transactional
    public void addPhoto(Photo photo, MultipartFile file) throws IOException {
        Goods goods = goodsMapper.getGoodsById(photo.getGId());
        fileUtils.storePhoto("/" + goods.getAccount()
                + "/" + goods.getId(), file);
        photoMapper.addPhoto(photo);
    }
}
