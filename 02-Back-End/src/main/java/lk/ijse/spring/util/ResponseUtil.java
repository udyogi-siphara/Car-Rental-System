/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/20/2023
 * Time        : 10:50 AM
 */

package lk.ijse.spring.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ResponseUtil {
    private String code;
    private String message;
    private Object data;
}
