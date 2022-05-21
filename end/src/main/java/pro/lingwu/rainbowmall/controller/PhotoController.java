package pro.lingwu.rainbowmall.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dto.db.Photo;
import pro.lingwu.rainbowmall.service.PhotoService;

import java.io.IOException;

/**
 * @author @lingwu
 * @date created in 12/10/2021
 */
@RestController
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @DeleteMapping("/photo/{id}")
    public ResponseEntity<?> rmPhoto(@PathVariable long id){
        photoService.rmPhoto(id);
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/photo")
    public ResponseEntity<?> addPhoto(String gId, MultipartFile photo) throws IOException {
        Photo photo1 = new Photo();
        photo1.setPname(photo.getOriginalFilename());
        photo1.setGId(gId);
        photoService.addPhoto(photo1, photo);
        return ResponseEntity.ok("ok");
    }

}
