/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 3/8/2023
 * Time        : 12:18 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DriverScheduleRepo extends JpaRepository<DriverSchedule,String> {

}
