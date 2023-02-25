/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:11 PM
 */

package lk.ijse.spring.controller;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    public ResponseUtil saveDriver(@RequestBody DriverDTO dto){
        driverService.saveDriver(dto);
        return new ResponseUtil("200",dto.getDriverId()+ " Added.!",null);
    }

    @PutMapping()
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto){
        driverService.updateDriver(dto);
        return new ResponseUtil("200",dto.getDriverId()+": Updated.!",null);
    }

    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteDriver(@RequestParam String id){
        driverService.deleteDriver(id);
        return new ResponseUtil("200","Driver Deleted",null);
    }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        List<DriverDTO> allDrivers = driverService.getAllDriverDetail();
        return new ResponseUtil("200"," Success.!",allDrivers);
    }

}
