/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:10 PM
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto){
        customerService.saveCustomer(dto);
        return new ResponseUtil("200",dto.getCustomerId()+ " Added.!",null);
    }

    /*@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil regCustomer(@RequestPart("nImageFile") MultipartFile file, @RequestPart("customer") CustomerDTO customerDTO) {


            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                file.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil("500", "Registration Failed.Try Again Latter", null);
            }

            customerService.saveCustomer(customerDTO);
            return new ResponseUtil("200", "Registration Successfully....", customerDTO);
    }

    @PostMapping(path = "/uploadImg/{customerId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("imageLocation") MultipartFile imageLocation, @PathVariable String customerId) {
        try {


            System.out.println(imageLocation.getOriginalFilename());
            System.out.println("Upload Image");

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\carImage");
            uploadsDir.mkdir();

            imageLocation.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + imageLocation.getOriginalFilename()));


            String carFrontViewPath = projectPath + "\\carImage" + imageLocation.getOriginalFilename();


            customerService.uploadNicImages(imageLocation, customerId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }*/

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
    public ResponseUtil loginCustomer(@RequestParam String userName){
        CustomerDTO customerDTO = customerService.checkCustomerLogIn(userName);
        return new ResponseUtil("200","Login Success!",customerDTO);
    }

    /*@GetMapping(params = {"customerId"})
    public ResponseUtil autoGenId(@RequestParam String customerId){
        CustomerDTO customerDTO = customerService.autoGenCustomerId(customerId);
        return new ResponseUtil("200","Login Success!",customerDTO);
    }*/

}
