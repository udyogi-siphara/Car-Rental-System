/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:56 PM
 */

package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;

import lk.ijse.spring.entity.Car;

import lk.ijse.spring.repo.CarRepo;

import lk.ijse.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveCar(CarDTO carDTO) {
        if (carRepo.existsById(carDTO.getRegistrationId())){
            throw new RuntimeException("Car "+carDTO.getRegistrationId()+"Already Exists");
        }
        carRepo.save(modelMapper.map(carDTO, Car.class));
    }

    @Override
    public void updateCar(CarDTO carDTO) {
        if (carRepo.existsById(carDTO.getRegistrationId())){
            Optional<Car> updateCar = carRepo.findById(carDTO.getRegistrationId());
            Car car = updateCar.get();
            car.setPriceForExtraKm(carDTO.getPriceForExtraKm());
            car.setDailyRate(carDTO.getDailyRate());
            car.setMonthlyRate(carDTO.getMonthlyRate());
            car.setLastServiceMileage(carDTO.getLastServiceMileage());
            car.setFreeServiceMileage(carDTO.getFreeServiceMileage());
            car.setDamageCost(carDTO.getDamageCost());
            car.setAvailability(carDTO.getAvailability());
            car.setColor(carDTO.getColor());
            carRepo.save(updateCar.get());
        }else {
            throw new RuntimeException("Car"+carDTO.getRegistrationId()+"Not Available to Update..!");
        }
    }

    @Override
    public void uploadCarImages(String frontPath, String backPath, String sidePath, String interiorPath, String registrationNum) {
        if (carRepo.existsById(registrationNum)) {

            carRepo.updateCarFilePaths(frontPath, backPath, sidePath,interiorPath, registrationNum);
        } else {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void deleteCar(String id) {
        if (!carRepo.existsById(id)){
            throw new RuntimeException("Car "+id+" Not Available To Delete.");
        }
        carRepo.deleteById(id);
    }

    @Override
    public CarDTO getCarDetail(String id) {
        return null;
    }

    @Override
    public List<CarDTO> getAllCarDetail() {
        return modelMapper.map(carRepo.findAll(), new TypeToken<List<CarDTO>>() {}.getType());
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
