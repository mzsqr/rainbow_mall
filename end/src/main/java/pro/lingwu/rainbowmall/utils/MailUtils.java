package pro.lingwu.rainbowmall.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.IContext;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

/**
 * @author @lingwu
 * @date created in 12/8/2021
 */
@Component
public class MailUtils {

    @Value("${spring.mail.username}")
    private String username;
    private final JavaMailSenderImpl sender;
    private final ThymeleafViewResolver resolver;

    public MailUtils(JavaMailSenderImpl sender, ThymeleafViewResolver resolver) {
        this.sender = sender;
        this.resolver = resolver;
    }

    public void sendTo(String dist, String view, IContext context, String subject) throws MessagingException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(dist);
        helper.setText(resolver.getTemplateEngine().process(view, context), true);
        helper.setSubject(subject);
        helper.setFrom(username);
        sender.send(message);
     }

}
