/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/27/2023
 * Time        : 2:48 PM
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;

import lk.ijse.spring.service.AdminService;

import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @GetMapping(params = {"userName"})
    public ResponseUtil loginAdmin(@RequestParam String userName){
        AdminDTO adminDTO = adminService.checkAdminLogIn(userName);
        return new ResponseUtil("200","Login Success!",adminDTO);
    }

}
