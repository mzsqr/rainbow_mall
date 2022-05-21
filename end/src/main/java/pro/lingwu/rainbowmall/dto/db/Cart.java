package pro.lingwu.rainbowmall.dto.db;

import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

/**
 * @author @lingwu
 * @date created in 11/18/2021
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("购物车")
public class Cart {

    @Positive
    private Long id;

    @NotNull
    @Pattern(regexp = "[0-9a-zA-Z]{10,15}")
    private String account;

    @NotNull
    @Positive
    private Long gId;

    @NotNull
    @Positive
    private Integer num;

    private Integer orgPrice;

}
