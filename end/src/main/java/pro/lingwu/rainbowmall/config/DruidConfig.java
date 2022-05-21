package pro.lingwu.rainbowmall.config;

import com.alibaba.druid.support.http.StatViewServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @author @lingwu
 * @date created in 12/11/2021
 */
@Configuration
public class DruidConfig {

    @Bean
    ServletRegistrationBean<StatViewServlet> statViewServlet(){
        var res = new ServletRegistrationBean<>(
                new StatViewServlet(),
                "/druid/*"
        );
        res.addInitParameter("allow", "127.0.0.1");
        res.addInitParameter("deny", "");
        res.addInitParameter("loginUsername", "lingwu");
        res.addInitParameter("loginPassword", "yxpbsqq@741");
        return res;
    }

}
