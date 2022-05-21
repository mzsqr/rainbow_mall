package pro.lingwu.rainbowmall.dto.db;

import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.*;
import java.sql.Date;
import java.util.List;

/**
 * @author @lingwu
 * @date created in 11/18/2021
 */
@ToString
@ApiModel("商品")
public class Goods {

    public Goods() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Goods(String id, Integer price, Integer volume, String account, String title, String description, List<Photo> photos, Date addDate, String example, Integer status, String category) {
        this.id = id;
        this.price = price;
        this.volume = volume;
        this.account = account;
        this.title = title;
        this.description = description;
        this.photos = photos;
        this.addDate = addDate;
        this.example = example;
        this.status = status;
        this.category = category;
    }

    private String id;

    @NotNull
    @Positive
    private Integer price;

    @NotNull
    @PositiveOrZero
    private Integer volume;

    private String account;

    @NotNull
    private String title;

    @NotNull
    private String description;

    private List<Photo> photos;

    private Date addDate;

    private String example;

    private Integer status;

    private String category;

    public Goods(Integer price, Integer volume, String account,
                 String title, String description) {
        this.price = price;
        this.volume = volume;
        this.account = account;
        this.title = title;
        this.description = description;
    }

    public Goods(Integer price, Integer volume,
                 String account, String title,
                 String description, Date addDate, String example) {
        this(price, volume, account, title, description);
        this.addDate = addDate;
        this.example = example;
    }
}
