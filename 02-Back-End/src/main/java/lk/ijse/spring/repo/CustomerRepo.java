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

public interface CustomerRepo extends JpaRepository<Customer,String> {
    Customer searchCustomerByUserName(String userName);
}
