package pro.lingwu.rainbowmall.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import pro.lingwu.rainbowmall.dto.db.Explore;
import pro.lingwu.rainbowmall.dto.db.Order;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Mapper
public interface ExploreMapper {

    void addExploreRecord(Explore explore);

    List<Explore> getOrdersBy(@Param("nickname") String nickname,
                            @Param("title") String title,
                            @Param("ex_date")String exDate);

    long getTotalBy(@Param("nickname") String nickname,
                    @Param("title") String title,
                    @Param("ex_date")String exDate);
}
