package pro.lingwu.rainbowmall.controller;

import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.lingwu.rainbowmall.dto.db.Explore;
import pro.lingwu.rainbowmall.service.ExploreService;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@RestController
@Api
public class ExploreController {
    private final ExploreService exploreService;

    public ExploreController(ExploreService exploreService) {
        this.exploreService = exploreService;
    }

    @PostMapping("/explore")
    public ResponseEntity<?> addExploreRecord( Explore explore){
        exploreService.addExplore(explore);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/explore")
    public ResponseEntity<?> getExplores(String nickname,
                                         String title, int start, int size){
        var res = exploreService.getExplores(nickname, title, start, size);
        return ResponseEntity.ok(res);
    }

}
