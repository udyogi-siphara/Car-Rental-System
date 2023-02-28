/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/28/2023
 * Time        : 10:16 AM
 */

package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class DriverLoginDTO {
    private String userName;
    private String password;
}
