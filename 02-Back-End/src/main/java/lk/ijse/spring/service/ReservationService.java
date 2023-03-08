/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:48 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.ReservationDTO;

import java.util.List;

public interface ReservationService {
    String generateReservationId();

    void requestReservation(ReservationDTO ReservationDTO);

    void updateReservationStatus(String reserve_id, String driver_id, String status);

    List<ReservationDTO> getAllPendingReservation();

    ReservationDTO getReservationDetail(String id);

    List<ReservationDTO> getAllTodayReservation();

    List<ReservationDTO> getAllTodayPickUps();

    List<ReservationDTO> getAllReservation();

    List<ReservationDTO> getCustomerReservationByStatus(String id, String status);
}
