/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 11:04 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.dto.DriverScheduleDTO;
import lk.ijse.spring.dto.ReservationDTO;
import lk.ijse.spring.entity.*;
import lk.ijse.spring.repo.*;
import lk.ijse.spring.service.ReservationService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    RentalRepo carReservationRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    DriverScheduleRepo driverScheduleRepo;

    @Override
    public String generateReservationId() {
        String id = carReservationRepo.generateReservationId();
        if (!(id == null)) {

            String prefix = id.substring(0, 1);  // extract the prefix, e.g. "C"
            int number = Integer.parseInt(id.substring(1));  // extract the numeric portion and parse it as an integer
            number++;  // increment the number
            return prefix + String.format("%03d", number);


        } else {
            return "R001";
        }

    }

    @Override
    public void updateReservation(ReservationDTO reservationDTO) {
        if (carReservationRepo.existsById(reservationDTO.getRentalId())){
            Optional<Rental> updateReservation = carReservationRepo.findById(reservationDTO.getRentalId());
            Rental rental = updateReservation.get();
            rental.setReservationStatus(reservationDTO.getReservationStatus());
            carReservationRepo.save(updateReservation.get());
        }else {
            throw new RuntimeException("Reservation"+reservationDTO.getRentalId()+"Not Available to Update..!");
        }
    }

    @Override
    public void requestReservation(ReservationDTO reservationDTO) {
        if (!carReservationRepo.existsById(reservationDTO.getRentalId())) {
            Rental carReservation = mapper.map(reservationDTO, Rental.class);

            Customer customer = customerRepo.findById(reservationDTO.getCustomer().getCustomerId()).get();

            Car car = carRepo.findById(reservationDTO.getCar().getRegistrationId()).get();


            if (reservationDTO.getDriverStatus().equalsIgnoreCase("YES")) {

                carReservation.setCustomer(mapper.map(customer,Customer.class));
                carReservation.setCar(car);


                Driver driver = driverRepo.getDriverByDriverStatus();
                if(driver!=null){
                    DriverScheduleDTO driverScheduleDTO = new DriverScheduleDTO(
                            reservationDTO.getRentalId(),
                            reservationDTO.getPickupDate(),
                            reservationDTO.getReturnDate(),
                            mapper.map(driver, DriverDTO.class),
                            mapper.map(carReservation, ReservationDTO.class));

                    driverScheduleRepo.save(mapper.map(driverScheduleDTO, DriverSchedule.class));


                    carReservation.setCustomer(mapper.map(customer,Customer.class));
                    carReservation.setCar(car);



                    carReservationRepo.save(carReservation);

                }else{
                    System.out.println("You Can't assign Driver at that movement");
                }


            }else{
                carReservation.setCustomer(mapper.map(customer,Customer.class));
                carReservation.setCar(car);
                carReservationRepo.save(carReservation);

            }

        } else {
            throw new RuntimeException("Your Reservation Request can't Send in this moment,Try Again..!");
        }


      }


    @Override
    public List<ReservationDTO> getAllReservationByStatus() {
        return mapper.map(carReservationRepo.getRentalByReservationStatus(), new TypeToken<List<ReservationDTO>>() {}.getType());
    }

    @Override
    public DriverScheduleDTO getDriverIdByScheduleId(String id) {
        return mapper.map(driverScheduleRepo.getDriverIdBySchedule_id(id), DriverScheduleDTO.class);
    }

    @Override
    public  List<ReservationDTO> getReservationDetail(String id) {
        return mapper.map(carReservationRepo.getRentalByCustomerId(id),new TypeToken<List<ReservationDTO>>(){}.getType());
    }


}
