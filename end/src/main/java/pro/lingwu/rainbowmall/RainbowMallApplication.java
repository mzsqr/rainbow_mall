package pro.lingwu.rainbowmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RainbowMallApplication {

    public static void main(String[] args) {
        SpringApplication.run(RainbowMallApplication.class, args);
    }

    @GetMapping("/")
    public String test(){
        return "Hello mall";
    }

}
