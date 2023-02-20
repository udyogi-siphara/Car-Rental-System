/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:59 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            throw new RuntimeException("Customer" +customerDTO.getCustomerId()+"Already Exist..!");
        }
        customerRepo.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public String updateCustomer(CustomerDTO customerDTO) {
        return null;
    }

    @Override
    public void deleteCustomer(String id) {

    }

    @Override
    public CustomerDTO getCustomerDetail(String id) {
        return null;
    }

    @Override
    public List<CustomerDTO> getAllCustomerDetail() {
        return null;
    }

    @Override
    public List<CustomerDTO> getTodayRegisteredCustomers() {
        return null;
    }
}
