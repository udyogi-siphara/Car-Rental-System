/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:11 PM
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.ReservationDTO;
import lk.ijse.spring.service.ReservationService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@CrossOrigin
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService carReservationService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil requestReservation(@RequestPart("reservation") ReservationDTO carReservation, @RequestPart("file") MultipartFile file) {
        System.out.println(carReservation);
        carReservation.setBankSlip("uploads/" + carReservation.getBankSlip());

        carReservationService.requestReservation(carReservation);


        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            file.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + file.getOriginalFilename()));

        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            return new ResponseUtil("500", "Reservation Sending Filed.Try Again Latter", carReservation);
        }
        return new ResponseUtil("200", "Request Send Successfully", carReservation);
    }


    @GetMapping(path = "generateReservationId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateReservationId() {
        return new ResponseUtil("200", "Done", carReservationService.generateReservationId());
    }

    @PutMapping
    public ResponseUtil updateReservation(@RequestBody ReservationDTO dto){
        carReservationService.updateReservation(dto);
        return new ResponseUtil("200",dto.getRentalId()+"Updated.!",null);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllReservationByStatus() {
        return new ResponseUtil("200", "Done", carReservationService.getAllReservationByStatus());
    }

    @GetMapping(path = "getDriverId/{rid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverId(@PathVariable String rid) {
        return new ResponseUtil("200", "Done", carReservationService.getDriverIdByScheduleId(rid));
    }

    @GetMapping(path = "getCustomerId/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getReservationDetail(@PathVariable String cid) {
        System.out.println("cid"+cid);
        return new ResponseUtil("200", "Done", carReservationService.getReservationDetail(cid));

    }

}
