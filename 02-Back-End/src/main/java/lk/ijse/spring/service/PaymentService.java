/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:44 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {
    String generateReservationBillIdId();

    void makePaymentForReservation(PaymentDTO paymentDTO);

    String getIncomeByDate(String type, String start_date, String end_date);

    List<PaymentDTO> getTodayIncomeList();
}
