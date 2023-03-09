/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 3/8/2023
 * Time        : 12:18 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.DriverSchedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface DriverScheduleRepo extends JpaRepository<DriverSchedule,String> {
    @Query(value = "SELECT driverId=:driverId FROM driveschedule WHERE schedule_id=?", nativeQuery = true)
    DriverSchedule getDriverIdBySchedule_id(@Param("driverId") String driverId);

}
