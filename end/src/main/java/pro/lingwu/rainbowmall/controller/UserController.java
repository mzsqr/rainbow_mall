package pro.lingwu.rainbowmall.controller;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.User;
import pro.lingwu.rainbowmall.dto.db.UserLoginRecord;
import pro.lingwu.rainbowmall.exception.CodeNotEqualsException;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;
import pro.lingwu.rainbowmall.service.UserLoginRecordService;
import pro.lingwu.rainbowmall.service.UserService;
import pro.lingwu.rainbowmall.utils.RoleConstant;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Api("user")
@RestController
public class UserController {

    private final UserService service;

    private final UserLoginRecordService loginRecordService;

    public UserController(UserService service, UserLoginRecordService loginRecordService) {
        this.service = service;
        this.loginRecordService = loginRecordService;
    }

    @PostMapping("/user")
    @ApiOperation("用户注册")
    public User register(@Valid User user,
                         @RequestParam(name = "photo", required = false) MultipartFile photo,
                         String code,
                         HttpServletRequest request) throws IOException, CodeNotEqualsException {
        service.addUser(user, photo, code);
        return user;
    }

    @PostMapping("/admin/user")
    @ApiOperation("用户注册")
    public User registerSeller(@Valid User user) throws IOException, CodeNotEqualsException {
        service.addSeller(user);
        return user;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getSellers(int start, int size){
        return ResponseEntity.ok(service.getSeller(start, size));
    }

    @GetMapping("/user/{account}")
    @ApiOperation("用户登录")
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok", response = User.class),
            @ApiResponse(code = 404, message = "not found")
    })
    public ResponseEntity<?> signIn(@PathVariable String account,
                                    String password, HttpServletRequest request){
        User user = service.signIn(account, password, request);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        loginRecordService.addRecord(request,
                RoleConstant.NORMAL_USER, account);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{account}")
    @ApiOperation("用户信息更新")
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok"),
            @ApiResponse(code = 401, message = "请登录")
    })
    public ResponseEntity<?> updateUser(@PathVariable String account,
                                        User user,
                                        HttpServletRequest request){
        user.setAccount(account);
        if (service.updateUser(user, request)){
            return ResponseEntity.ok("ok");
        }
        return ResponseEntity.status(401).body("请登录");
    }

    @DeleteMapping("/user/{account}")
    @ApiOperation("注销用户")
    public ResponseEntity<?> deleteUser(@PathVariable String account){
        service.rmUserBy(account);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/user/code/{account}")
    @ApiOperation("获取验证码")
    public ResponseEntity<?> sendVerifyCode(@PathVariable String account, String email,
                                            HttpServletRequest request, HttpServletResponse response) throws MessagingException {
        service.sendVerifyCode(account, email, new WebContext(request, response, request.getServletContext()));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/{account}")
    @ApiOperation("管理员")
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok", response = User.class),
            @ApiResponse(code = 404, message = "not found")
    })
    public ResponseEntity<?> signInAdmin(@PathVariable String account,
                                    String password, HttpServletRequest request){
        User user = service.signInAdmin(account, password, request);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        loginRecordService.addRecord(request, RoleConstant.SELLER, account);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/money/{from}")
    public ResponseEntity<?> giveMoney(@PathVariable String from, String to, int much, String password) throws PasswordVerifyFailed {
        service.giveMoney(from, to, much, password);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/user/stat-today")
    public ResponseEntity<?> getOrdersStatToday(){
        return ResponseEntity.ok(service.getTodayStat());
    }

    @GetMapping("/user/stat")
    public ResponseEntity<?> getOrderStat(){
        return ResponseEntity.ok(service.getStats());
    }


}
