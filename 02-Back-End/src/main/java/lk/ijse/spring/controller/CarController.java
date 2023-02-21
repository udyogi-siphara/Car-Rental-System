/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:08 PM
 */

package lk.ijse.spring.controller;


import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {

    @GetMapping
    public String get(){
        System.out.println(" car Awaaaa");
        return " car heee";
    }


}
