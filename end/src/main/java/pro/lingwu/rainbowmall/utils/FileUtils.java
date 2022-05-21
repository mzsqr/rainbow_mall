package pro.lingwu.rainbowmall.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Component
@Slf4j
public class FileUtils {

    @Value("${pro.lingwu.rainbowmall.photo-base}")
    private String photoBase;

    public String storePhoto(String path, MultipartFile file) throws IOException {
        // 创建目录
        if (!Files.exists(Paths.get(photoBase+path)))
            Files.createDirectories(Paths.get(photoBase+path));


        String filename = null;
        // 判断是否存在
        if (file == null) {
            filename = "default_avatar.png";
            FileSystemResource to =
                    new FileSystemResource(photoBase+path+"/"+filename);
//            FileInputStream in = new FileInputStream(photoBase+"/" + filename);
//            in.transferTo(to.getOutputStream());
            ClassPathResource from = new ClassPathResource("static/default_avatar.png");
            from.getInputStream().transferTo(to.getOutputStream());
        }else {
            filename = file.getOriginalFilename();
            FileSystemResource to =
                    new FileSystemResource(photoBase+path+"/"+file.getOriginalFilename());
            file.getInputStream().transferTo(new FileOutputStream(to.getFile()));
        }

//        log.info("store file: "+photoBase+path+"/"+filename);
        return filename;
    }
    public String storeGoodsPhotoTest(String path) throws IOException {
        // 创建目录
        if (!Files.exists(Paths.get(photoBase+path)))
            Files.createDirectories(Paths.get(photoBase+path));


        String filename = new Random().nextInt(10)<7? "test_1.png":"test_2.jpg";
        FileSystemResource to =
                new FileSystemResource(photoBase+path+"/"+filename);
//            FileInputStream in = new FileInputStream(photoBase+"/" + filename);
//            in.transferTo(to.getOutputStream());
        ClassPathResource from = new ClassPathResource("static/"+filename);
        from.getInputStream().transferTo(to.getOutputStream());

//        log.info("store file: "+photoBase+path+"/"+filename);
        return filename;
    }

    public void rmPhoto(String path, String name) throws IOException {
        Path res = Paths.get(photoBase+path+"/"+name);
        Files.deleteIfExists(res);
    }

    public void rmGoodsDir(String path) throws IOException {
        Path res = Paths.get(path);
        Files.delete(res);
    }

}
