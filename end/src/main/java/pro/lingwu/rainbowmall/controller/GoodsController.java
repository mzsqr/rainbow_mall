package pro.lingwu.rainbowmall.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pro.lingwu.rainbowmall.dto.db.Goods;
import pro.lingwu.rainbowmall.dto.db.ManagerRecord;
import pro.lingwu.rainbowmall.service.GoodsService;
import pro.lingwu.rainbowmall.service.ManagerRecordService;
import pro.lingwu.rainbowmall.utils.ManagerConstant;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/24/2021
 */
@Api("商品")
@RestController
public class GoodsController {

    private final GoodsService goodsService;

    private final ManagerRecordService recordService;

    public GoodsController(GoodsService goodsService, ManagerRecordService recordService) {
        this.goodsService = goodsService;
        this.recordService = recordService;
    }

    @GetMapping("/goods")
    @ApiOperation("获取商品列表")
    public ResponseEntity<?> getSomeGoods(int start, int size, String account){
        var res =  goodsService.getSomeGoods(account, start, size);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/goods")
    public ResponseEntity<?> addGoods(@Valid Goods goods,
                                      @RequestParam(required = false) String eAccount,
                                      @RequestParam(required = false) String remark,
                                      List<MultipartFile> files) throws IOException {
        goodsService.addGoods(goods,files);

        // goods被修改了事实上
        ManagerRecord managerRecord = new ManagerRecord(eAccount, goods.getId(),
                LocalDateTime.now().toString(), ManagerConstant.ADD_GOODS, remark ,null);
        recordService.addRecord(managerRecord);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/goods/{id}")
    public ResponseEntity<?> getGoods(@PathVariable String id){
        var res = goodsService.getGoodsBy(id);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/goods/{id}")
    public ResponseEntity<?> rmGoods(@PathVariable String id,
                                     @RequestParam(required = false)String eAccount,
                                     @RequestParam(required = false)String remark) throws IOException {
        goodsService.rmGoods(id);
        ManagerRecord managerRecord = new ManagerRecord(eAccount, id,
                LocalDateTime.now().toString(), ManagerConstant.DELETE_GOODS, remark, null);
        recordService.addRecord(managerRecord);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/goods/{id}")
    public ResponseEntity<?> updateGoods(@PathVariable String id,
                                         Goods goods,
                                         @RequestParam(required = false)String eAccount,
                                         @RequestParam(required = false)String remark){
        goods.setId(id);
        goodsService.updateGoods(goods);
        ManagerRecord managerRecord = new ManagerRecord(eAccount, id,
                LocalDateTime.now().toString(), ManagerConstant.MODIFY_GOODS, remark, null);
        recordService.addRecord(managerRecord);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/client/goods")
    public ResponseEntity<?> getGoods(int start, int size){
        System.out.println("start = " + start + ", size = " + size);
        var res = goodsService.getSomeGoods(null, start, size);
        return ResponseEntity.ok(res.getResult());
    }

    @GetMapping("/client/search")
    public ResponseEntity<?> searchGoods(@RequestParam(required = false) List<String> keywords ,Integer start, Integer size){
        var res = goodsService.searchGoods(keywords,start, size);
        return ResponseEntity.ok(res);
    }


}
