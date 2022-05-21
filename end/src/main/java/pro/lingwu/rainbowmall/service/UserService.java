package pro.lingwu.rainbowmall.service;

import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.WebContext;
import pro.lingwu.rainbowmall.dto.PagesResult;
import pro.lingwu.rainbowmall.dto.db.Stat;
import pro.lingwu.rainbowmall.dto.db.User;
import pro.lingwu.rainbowmall.exception.CodeNotEqualsException;
import pro.lingwu.rainbowmall.exception.PasswordVerifyFailed;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
public interface UserService {

    void addUser(User user, MultipartFile avatar, String code) throws IOException, CodeNotEqualsException;

    User signIn(String account, String password, HttpServletRequest request);

    User signInAdmin(String account, String password, HttpServletRequest request);

    boolean updateUser(User user, HttpServletRequest request);

    void rmUserBy(String account);

    void sendVerifyCode(String account, String email, WebContext request) throws MessagingException;

    void giveMoney(String from, String to, int much, String password) throws PasswordVerifyFailed;

    Stat getTodayStat();

    List<Stat> getStats();

    PagesResult<User> getSeller(int start, int size);

    void addSeller(User user) throws IOException;
}
