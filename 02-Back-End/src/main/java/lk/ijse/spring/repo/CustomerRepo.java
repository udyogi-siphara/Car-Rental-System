/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:41 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    Customer searchCustomerByUserName(String userName);

   /* @Modifying
    @Transactional
    @Query(value= "UPDATE Customer SET imageLocation=:imageLocation WHERE customerId=:customerId",nativeQuery=true)
    void updateCarFilePaths(@Param("imageLocation") MultipartFile imageLocation, @Param("customerId")String customerId);

    @Query(value= "Select customerId FROM Customer ORDER BY customerId DESC",nativeQuery=true)
    Customer getCustomerByCustomerId(@Param("customerId") String customerId);*/
}
