/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/28/2023
 * Time        : 10:22 AM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.DriverLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverLoginRepo extends JpaRepository<DriverLogin,String> {
    DriverLogin searchDriverByUserName(String userName);
}
