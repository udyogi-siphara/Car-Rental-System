/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 11:04 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ReservationDTO;
import lk.ijse.spring.entity.Car;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.repo.RentalRepo;
import lk.ijse.spring.service.ReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;

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

    @Override
    public String generateReservationId() {
        return null;
    }

    @Override
    public void requestReservation(ReservationDTO reservationDTO) {
        if (!carReservationRepo.existsById(reservationDTO.getRentalId())) {
            if (true) {

                Rental carReservation = mapper.map(reservationDTO, Rental.class);
                
                Customer customer = customerRepo.findById(reservationDTO.getCustomer().getCustomerId()).get();
                Car car = carRepo.findById(reservationDTO.getCar().getRegistrationId()).get();

                carReservation.setCustomer(mapper.map(customer,Customer.class));
                carReservation.setCar(car);

                carReservationRepo.save(carReservation);
            } else {
                throw new RuntimeException("Your Reservation Request can't Send in this moment,Try Again..!");
            }
        }
    }

    @Override
    public void updateReservationStatus(String reserve_id, String driver_id, String status) {

    }

    @Override
    public List<ReservationDTO> getAllPendingReservation() {
        return null;
    }

    @Override
    public ReservationDTO getReservationDetail(String id) {
        return null;
    }

    @Override
    public List<ReservationDTO> getAllTodayReservation() {
        return null;
    }

    @Override
    public List<ReservationDTO> getAllTodayPickUps() {
        return null;
    }

    @Override
    public List<ReservationDTO> getCustomerReservationByStatus(String id, String status) {
        return null;
    }
}
