/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/28/2023
 * Time        : 10:23 AM
 */

package lk.ijse.spring.service;


import lk.ijse.spring.dto.DriverLoginDTO;

public interface DriverLoginService {
    DriverLoginDTO checkDriverLogIn(String userName);
}
