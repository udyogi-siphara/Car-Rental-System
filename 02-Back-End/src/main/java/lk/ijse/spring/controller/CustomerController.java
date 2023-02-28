/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:10 PM
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

   /* @GetMapping
    public String get(){
        System.out.println("Awaaaa");
        return "heee";
    }*/

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto){
        customerService.saveCustomer(dto);
        return new ResponseUtil("200",dto.getCustomerId()+ " Added.!",null);
    }

   /* @PutMapping
    public ResponseUtil updateCustomer(@ModelAttribute CustomerDTO dto){
        customerService.updateCustomer(dto);
        return new ResponseUtil("200",dto.getCustomerId()+": Updated.!",null);
    }*/

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto){
        customerService.updateCustomer(dto);
        return new ResponseUtil("200",dto.getCustomerId()+": Updated.!",null);
    }

    @DeleteMapping(params = {"customerId"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@RequestParam String customerId){
        customerService.deleteCustomer(customerId);
        return new ResponseUtil("200",customerId+" : Deleted.!",null);
    }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        List<CustomerDTO> allCustomers = customerService.getAllCustomerDetail();
        return new ResponseUtil("200"," Success.!",allCustomers);
    }

    @GetMapping(params = {"customerId"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomer(@RequestParam String customerId){
        CustomerDTO customerDTO = customerService.searchCustomer(customerId);
        return new ResponseUtil("200","Getting Success!",customerDTO);
    }

    @GetMapping(params = {"userName"})
    public ResponseUtil loginAdmin(@RequestParam String userName){
        CustomerDTO customerDTO = customerService.checkCustomerLogIn(userName);
        return new ResponseUtil("200","Login Success!",customerDTO);
    }

}
