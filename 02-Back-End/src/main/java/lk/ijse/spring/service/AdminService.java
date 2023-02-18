/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:22 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.AdminDTO;

public interface AdminService {
    AdminDTO checkAdminLogIn(String id, String password);
}
