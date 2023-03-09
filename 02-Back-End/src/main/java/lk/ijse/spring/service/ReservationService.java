/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:48 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.DriverScheduleDTO;
import lk.ijse.spring.dto.ReservationDTO;
import lk.ijse.spring.entity.DriverSchedule;

import java.util.List;

public interface ReservationService {
    String generateReservationId();

    void updateReservation(ReservationDTO reservationDTO);

    void requestReservation(ReservationDTO ReservationDTO);

    List<ReservationDTO> getAllReservationByStatus();

    DriverScheduleDTO getDriverIdByScheduleId(String id);

    List<ReservationDTO> getReservationDetail(String id);


}
