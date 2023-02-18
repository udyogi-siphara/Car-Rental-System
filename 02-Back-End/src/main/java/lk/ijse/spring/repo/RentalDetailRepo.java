/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:46 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.RentalDetail;
import lk.ijse.spring.entity.Rental_Detail_PK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, Rental_Detail_PK> {
}
