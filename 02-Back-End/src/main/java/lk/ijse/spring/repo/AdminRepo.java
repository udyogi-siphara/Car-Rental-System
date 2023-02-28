/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:00 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.transaction.annotation.Transactional;

public interface AdminRepo extends JpaRepository<Admin,String> {
    /*@Modifying
    @Transactional
    @Query(value = "SELECT * FROM Admin where userName=?1 and password=?2", nativeQuery = true)
    void adminLogin(@Param("userName")String userName,@Param("password")String password);*/

    Admin searchAdminByUserName(String userName);
}
