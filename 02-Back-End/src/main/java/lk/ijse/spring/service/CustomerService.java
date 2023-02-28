/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:39 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);

    void updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer (String id);

    CustomerDTO searchCustomer(String id);

    List<CustomerDTO> getAllCustomerDetail();

    List<CustomerDTO> getTodayRegisteredCustomers();

    CustomerDTO checkCustomerLogIn(String userName);
}
