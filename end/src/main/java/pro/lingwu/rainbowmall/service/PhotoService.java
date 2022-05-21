package pro.lingwu.rainbowmall.service;

import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dto.db.Photo;

import java.io.IOException;

/**
 * @author @lingwu
 * @date created in 12/10/2021
 */
public interface PhotoService {

    void rmPhoto(long id);

    void addPhoto(Photo photo, MultipartFile file) throws IOException;
}
