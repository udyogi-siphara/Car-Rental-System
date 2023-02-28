/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/28/2023
 * Time        : 10:25 AM
 */

package lk.ijse.spring.controller;


import lk.ijse.spring.dto.DriverLoginDTO;
import lk.ijse.spring.service.DriverLoginService;

import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/driverLogin")
public class DriverLoginController {
    @Autowired
    private DriverLoginService driverLoginService;

    @GetMapping(params = {"userName"})
    public ResponseUtil loginCustomer(@RequestParam String userName){
        DriverLoginDTO driverLoginDTO = driverLoginService.checkDriverLogIn(userName);
        return new ResponseUtil("200","Login Success!",driverLoginDTO);
    }
}
