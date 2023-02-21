/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 6:36 PM
 */

package lk.ijse.spring.config;

import lk.ijse.spring.advice.AppWideExceptionHandler;
import lk.ijse.spring.controller.CustomerController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackageClasses = {AppWideExceptionHandler.class, CustomerController.class})
@EnableWebMvc
public class WebAppConfig {

}
