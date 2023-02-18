/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 8:21 PM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Embeddable
@ToString
public class Rental_Detail_PK implements Serializable {
    private String rentalId;
    private String carId;
}
