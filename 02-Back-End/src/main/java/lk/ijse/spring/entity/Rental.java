/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 8:14 PM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Rental {
    @Id
    private String rentalId;
    @ManyToOne
    private Customer customerId;
    private LocalDate date;
    private LocalDate pickupDate;
    private double amount;
    private LocalDate returnDate;
    private double total_damage_viewer_payment;
    private String pickupLocation;
    private String returnLocation;
}
