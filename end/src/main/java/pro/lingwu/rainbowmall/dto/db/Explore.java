package pro.lingwu.rainbowmall.dto.db;

import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel
public class Explore {

    @NotNull
    private String account;

    @NotNull
    private String gId;

    private Timestamp exDate;

    private String action;

    private User user;
    private Goods goods;

}
