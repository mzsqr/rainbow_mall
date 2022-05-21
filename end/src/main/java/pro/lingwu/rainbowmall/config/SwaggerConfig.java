package pro.lingwu.rainbowmall.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author @lingwu
 * @date created in 11/18/2021
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket docket(ApiInfo apiInfo){
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo)
                .select()
                .paths(PathSelectors.any())
                .apis(RequestHandlerSelectors.any())
                .build();
    }

    @Bean
    public ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .version("0.0.1")
                .title("Rainbow Mall 后端API")
                .description("Rainbow Mall 的后端API文档")
                .contact(new Contact("lingwu", null, "1396119095@qq.com"))
                .build();
    }

}
