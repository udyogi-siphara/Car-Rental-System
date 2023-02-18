/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 8:25 PM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Payment {
    @Id
    private String paymentId;
    private LocalDate date;
    private double amount;
    private double damaged_cost;
    private String damagedDescription;
    private long extraMileage;
    private long costPerExtraKm;
    private String paymentStatus;

    @OneToOne
    private Rental rentalId;
}
