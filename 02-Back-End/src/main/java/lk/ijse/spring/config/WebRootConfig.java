/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 6:36 PM
 */

package lk.ijse.spring.config;

import lk.ijse.spring.service.impl.CustomerServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({JPAConfig.class})
@ComponentScan(basePackageClasses = {CustomerServiceImpl.class})
public class WebRootConfig {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
