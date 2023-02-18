/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 8:19 PM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@ToString
public class RentalDetail {
    @EmbeddedId
    private Rental_Detail_PK id;

    @ManyToOne
    private Driver driverId;
    private String rentalStatus;
    private String paymentSlip;
}
