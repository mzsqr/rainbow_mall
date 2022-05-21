package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import pro.lingwu.rainbowmall.dto.db.Stat;
import pro.lingwu.rainbowmall.dto.db.User;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/19/2021
 */
@Mapper
public interface UserMapper {

    void addUser(User user);

    User findUserBy(String account);

    void updateUser(User user);

    void rmUser(String account);

    void changeMoney(@Param("much") int much, @Param("account")String account);

    Stat getUserTodayStat();

    List<Stat> getUserStat();

    List<User> querySeller();
}
