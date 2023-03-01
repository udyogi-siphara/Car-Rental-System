/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/27/2023
 * Time        : 2:21 PM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class DriverLogin {
    @Id
    private String userName;
    private String password;
}