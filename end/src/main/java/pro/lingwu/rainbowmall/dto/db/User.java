package pro.lingwu.rainbowmall.dto.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.sql.Date;

/**
 * @author @lingwu
 * @date created in 11/18/2021
 */
@ToString
@ApiModel("用户")
public class User {

    public User() {
    }

    public User(String account, String password, String nickname, String phone, String email, Integer role, Date regDate, String avatar, String identity, long cartNum) {
        this.account = account;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.regDate = regDate;
        this.avatar = avatar;
        this.identity = identity;
        this.cartNum = cartNum;
    }

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }

    private Long money;

    @NotNull
    @Size(min = 10, max = 16)
    @Pattern(regexp = "[0-9a-zA-Z]{10,16}")
    private String account;

    @NotNull
    private String password;

    @NotNull
    @Size(max = 20)
    @NotBlank
    private String nickname;

    private String phone;

    @Email
    @NotNull
    private String email;

    /**
     * 用户类型<br/>
     * 0 - 买家<br/>
     * 1 - 卖家<br/>
     * 2 - 管理员<br/>
     */
    private Integer role;

    private Date regDate;

    private String avatar;

    private String identity;

    private long cartNum;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public long getCartNum() {
        return cartNum;
    }

    public void setCartNum(long cartNum) {
        this.cartNum = cartNum;
    }
}
