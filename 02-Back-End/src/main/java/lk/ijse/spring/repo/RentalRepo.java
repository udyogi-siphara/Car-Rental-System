/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:49 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RentalRepo extends JpaRepository<Rental,String> {

    @Query(value = "SELECT rentalId FROM rental ORDER BY rentalId DESC limit 1", nativeQuery = true)
    String generateReservationId();

    @Query(value = "SELECT * FROM rental WHERE reservationStatus='Pending'", nativeQuery = true)
    List<Rental> getRentalByReservationStatus();

    @Query(value = "SELECT * FROM rental WHERE customerId=:customerId", nativeQuery = true)
    List<Rental> getRentalByCustomerId(@Param("customerId") String customerId);

    /*@Query(value = "SELECT customerId,pickupDate,returnDate,returnLocation,pickupLocation,registrationId,driverStatus from rental where rentalId=rentalId", nativeQuery = true)
    List<Rental> getAllReservation();*/
}
