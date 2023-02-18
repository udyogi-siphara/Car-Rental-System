/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:00 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin,String> {
}
