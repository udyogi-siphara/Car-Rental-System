/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:31 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.AdminDTO;

import lk.ijse.spring.repo.AdminRepo;

import lk.ijse.spring.service.AdminService;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Transactional
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AdminDTO checkAdminLogIn(String userName) {
        return modelMapper.map(adminRepo.searchAdminByUserName(userName), AdminDTO.class);
    }

   /* @Override
    public void saveAdmin(AdminDTO adminDTO) {
        if (adminRepo.existsById(adminDTO.getAdminId())){
            throw new RuntimeException("Admin "+adminDTO.getAdminId()+" Already Exist..!");
        }
        Admin entity = modelMapper.map(adminDTO, Admin.class);
        adminRepo.save(entity);
    }*/
}
