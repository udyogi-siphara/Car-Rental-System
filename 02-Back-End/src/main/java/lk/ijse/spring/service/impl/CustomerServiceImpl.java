/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:59 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
    public void updateCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            customerRepo.save( modelMapper.map(customerDTO, Customer.class));
        }else {
            throw new RuntimeException("Customer " + customerDTO.getCustomerId() + " Not Available to Update..!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)){
            customerRepo.deleteById(id);
        }else {
            throw new RuntimeException("Customer " + id + " Not Available To Delete.");
        }

    }

    public CustomerDTO searchCustomer(String id) {
        return modelMapper.map(customerRepo.findById(id),new TypeToken<CustomerDTO>(){}.getType());
    }

    @Override
    public List<CustomerDTO> getAllCustomerDetail() {
        return modelMapper.map(customerRepo.findAll(),new TypeToken<List<CustomerDTO>>(){}.getType());
    }

    @Override
    public List<CustomerDTO> getTodayRegisteredCustomers() {
        return null;
    }

    @Override
    public CustomerDTO checkCustomerLogIn(String userName) {
        return modelMapper.map(customerRepo.searchCustomerByUserName(userName), CustomerDTO.class);
    }
}
