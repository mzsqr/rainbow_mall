package pro.lingwu.rainbowmall.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dao.UserMapper;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Stat;
import pro.lingwu.rainbowmall.dto.db.User;
import pro.lingwu.rainbowmall.exception.CodeNotEqualsException;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;
import pro.lingwu.rainbowmall.service.UserService;
import pro.lingwu.rainbowmall.utils.FileUtils;
import pro.lingwu.rainbowmall.utils.MailUtils;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper mapper;
    private final FileUtils fileUtils;
    private final MailUtils mailUtils;
    private final StringRedisTemplate template;

    public UserServiceImpl(UserMapper mapper, FileUtils fileUtils, MailUtils mailUtils, StringRedisTemplate template) {
        this.mapper = mapper;
        this.fileUtils = fileUtils;
        this.mailUtils=mailUtils;
        this.template = template;
    }

    @Override
    @Transactional
    public void addUser(User user, MultipartFile avatar, String code) throws IOException, CodeNotEqualsException {
        BoundValueOperations<String, String> ops =
                template.boundValueOps(user.getAccount() + ":" + user.getEmail() + ":verify-code");
        String rCode = ops.get();
        if (!code.equals(rCode)) throw new CodeNotEqualsException();
        String filename =
                fileUtils.storePhoto("/"+user.getAccount()+"/avatar", avatar);
        user.setAvatar(filename);
        user.setRegDate(Date.valueOf(LocalDate.now()));
        user.setRole(0);
        mapper.addUser(user);
    }

    @Override
    public User signIn(String account, String password, HttpServletRequest request) {
        User user = mapper.findUserBy(account);
        if (user != null && password.equals(user.getPassword())){
            HttpSession session = request.getSession();
            session.setAttribute("sign-in-"+account, true);
        }else user=null;
        return user;
    }

    @Override
    public User signInAdmin(String account, String password, HttpServletRequest request) {
        User user = mapper.findUserBy(account);
        if (user != null && password.equals(user.getPassword()) && user.getRole()!=0){
            HttpSession session = request.getSession();
            session.setAttribute("sign-in-"+account, true);
        }else user=null;
        return user;
    }

    @Override
    public boolean updateUser(User user, HttpServletRequest request) {
/*        HttpSession session = request.getSession();
        if ((boolean) session.getAttribute("sign-in-"+user.getAccount())){
            mapper.updateUser(user);
            return true;
        }*/
        mapper.updateUser(user);
        return true;
    }

    @Override
    public void rmUserBy(String account) {
        mapper.rmUser(account);
    }

    @Override
    public void sendVerifyCode(String account, String email, WebContext context) throws MessagingException {
        // 生成验证码
        var random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(random.nextInt(10));
        }
        context.getRequest().setAttribute("code", code.toString());

        // Redis储存验证码,10分钟过期
        BoundValueOperations<String, String> ops = template.boundValueOps(account + ":" + email + ":verify-code");
        ops.set(code.toString());
        ops.expire(10, TimeUnit.MINUTES);

        mailUtils.sendTo(email, "verifyCode", context, "来自RainbowMall的验证码");
    }

    @Override
    @Transactional
    public void giveMoney(String from, String to, int much, String password) throws PasswordVerifyFailed {
        var user = mapper.findUserBy(from);
        if (user == null) {
            throw new PasswordVerifyFailed();
        }
        mapper.changeMoney(-much, from);
        mapper.changeMoney(much, to);
    }

    @Override
    public Stat getTodayStat() {
        return mapper.getUserTodayStat();
    }

    @Override
    public List<Stat> getStats() {
        return mapper.getUserStat();
    }

    @Override
    public PagesResult<User> getSeller(int start, int size) {
        var page = PageHelper.startPage(start, size);
        var res = new PagesResult<User>();
        res.setResult(mapper.querySeller());
        var info = new PageInfo<>(res.getResult());
        res.setTotal(info.getTotal());
        page.close();
        return res;
    }

    @Override
    public void addSeller(User user) throws IOException {
        String filename =
                fileUtils.storePhoto("/"+user.getAccount()+"/avatar", null);
        user.setAvatar(filename);
        user.setRegDate(Date.valueOf(LocalDate.now()));
        mapper.addUser(user);
    }
}
