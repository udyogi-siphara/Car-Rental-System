/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 6:36 PM
 */

package lk.ijse.spring.config;

import lk.ijse.spring.advice.AppWideExceptionHandler;
import lk.ijse.spring.controller.CustomerController;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
/*@ComponentScan(basePackageClasses = {AppWideExceptionHandler.class, CustomerController.class})*/
@ComponentScan(basePackages = "lk.ijse.spring")
@EnableWebMvc
public class WebAppConfig implements WebMvcConfigurer {
    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**").addResourceLocations("/uploads/");
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
