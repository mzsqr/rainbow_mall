package pro.lingwu.rainbowmall.controller;

/**
 * @author @lingwu
 * @date created in 11/24/2021
 */
public enum ResponseCode {
    OK(200),
    NotSigned(401),
    NotFound(404),
    ;

    private final int code;

    ResponseCode(int code){
        this.code=code;
    }

    public int getCode() {
        return code;
    }
}
