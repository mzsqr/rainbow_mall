package pro.lingwu.rainbowmall.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author @lingwu
 * @date created in 12/6/2021
 */
public class PagesResult<T> {

    private List<T> result;
    private long total;

    public List<T> getResult() {
        return result;
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
