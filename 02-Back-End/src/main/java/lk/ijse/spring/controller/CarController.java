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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;


@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {

    @Autowired
    CarService carService;


    /*@PostMapping
    public ResponseUtil saveCar(@RequestBody CarDTO dto){
        carService.saveCar(dto);
        return new ResponseUtil("200", "Registration Successfully....", null);
    }*/

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil addVehicle(@RequestPart("vImageFile") MultipartFile[] file, @RequestPart("vehicle") CarDTO carDTO) {


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil("500", "Registration Failed.Try Again Latter", null);
            }
        }




        carService.saveCar(carDTO);
        return new ResponseUtil("200", "Registration Successfully....", carDTO);
    }

    @PostMapping(path = "/uploadImg/{registrationId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("image1") MultipartFile image1, @RequestPart("image2") MultipartFile image2, @RequestPart("image3") MultipartFile image3, @RequestPart("image4") MultipartFile image4, @PathVariable String registrationId) {
        try {


            System.out.println(image1.getOriginalFilename());
            System.out.println("Upload Image");

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\carImage");
            uploadsDir.mkdir();

            image1.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image1.getOriginalFilename()));
            image2.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image2.getOriginalFilename()));
            image3.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image3.getOriginalFilename()));
            image4.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image4.getOriginalFilename()));

            String carFrontViewPath = projectPath + "\\carImage" + image1.getOriginalFilename();
            String carBackViewPath = projectPath + "\\carImage" + image2.getOriginalFilename();
            String carSideViewPath = projectPath + "\\carImage" + image3.getOriginalFilename();
            String carInteriorViewPath = projectPath + "\\carImage" + image4.getOriginalFilename();

            carService.uploadCarImages(carFrontViewPath, carBackViewPath, carSideViewPath, carInteriorViewPath, registrationId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }

    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO dto){
        carService.updateCar(dto);
        return new ResponseUtil("200",dto.getRegistrationId()+"Updated.!",null);
    }

    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCar(@RequestParam String id){
        carService.deleteCar(id);
        return new ResponseUtil("200","Car Deleted",null);
    }

    @GetMapping(path = "allCarDetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarDetail() {
        return new ResponseUtil("200", "Done", carService.getAllCarDetail());
    }



}
