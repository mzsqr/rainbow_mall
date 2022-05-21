package pro.lingwu.rainbowmall.dto.db;

import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

/**
 * @author @lingwu
 * @date created in 11/18/2021
 */
@ToString
@ApiModel("图片")
public class Photo {

    public Photo(long id, String gId, String pname) {
        this.id = id;
        this.gId = gId;
        this.pname = pname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGId() {
        return gId;
    }

    public void setGId(String gId) {
        this.gId = gId;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public Photo() {
    }

    @NotNull
    @Positive
    private long id;

    @NotNull
    @Size(min = 32, max = 32)
    private String gId;

    @NotNull
    @Size(max = 256)
    private String pname;

}
