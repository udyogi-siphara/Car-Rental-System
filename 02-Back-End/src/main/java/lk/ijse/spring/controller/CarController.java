/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:08 PM
 */

package lk.ijse.spring.controller;


import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {

    @Autowired
    CarService carService;

  /*  @GetMapping
    public String get(){
        System.out.println(" car Awaaaa");
        return " car heee";
    }*/

    @PostMapping
    public ResponseUtil saveCar(@RequestBody CarDTO dto){
        carService.saveCar(dto);
        return new ResponseUtil("200", "Registration Successfully....", null);
    }


}
