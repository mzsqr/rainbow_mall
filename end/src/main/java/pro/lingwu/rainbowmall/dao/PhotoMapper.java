package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import pro.lingwu.rainbowmall.dto.db.Photo;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Mapper
public interface PhotoMapper {

    void addPhoto(Photo photo);

    void rmPhotoById(long id);

    void rmPhotosByGoods(String gId);

}
