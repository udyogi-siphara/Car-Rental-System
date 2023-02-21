/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:56 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveCar(CarDTO carDTO) {

    }

    @Override
    public void updateCar(CarDTO carDTO) {

    }

    @Override
    public void deleteCar(String id) {

    }

    @Override
    public CarDTO getCarDetail(String id) {
        return null;
    }

    @Override
    public List<CarDTO> getAllCarDetail() {
        return null;
    }

    @Override
    public List<CarDTO> getCarsUnderMaintain() {
        return null;
    }

    @Override
    public List<CarDTO> getCarsNeedMaintain() {
        return null;
    }

    @Override
    public List<CarDTO> getUnavailableOrAvailableCarsByStatus(String status) {
        return null;
    }

    @Override
    public List<CarDTO> getAvailableAndRentalCarsForReservation(String pick_up_date, String return_date, String status) {
        return null;
    }

    @Override
    public void setCarStatusUnavailableOrAvailable(String id, String status) {

    }

    @Override
    public List<CarDTO> sortCarsByAttributes(CarDTO carDTO) {
        return null;
    }
}
