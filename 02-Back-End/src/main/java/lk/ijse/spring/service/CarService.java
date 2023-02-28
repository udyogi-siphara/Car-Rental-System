/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 10:36 PM
 */

package lk.ijse.spring.service;

import lk.ijse.spring.dto.CarDTO;

import java.util.List;

public interface CarService {
    void saveCar(CarDTO carDTO);

    void updateCar(CarDTO carDTO);

    void deleteCar(String id);

    CarDTO getCarDetail(String id);

    void uploadCarImages(String frontPath, String backPath, String sidePath, String interiorPath, String registrationNum);

    List<CarDTO> getAllCarDetail();

    List<CarDTO>getViewSomeCarDetail(String brand,String model,double daily,double monthly,double damage);

    List<CarDTO> getCarsUnderMaintain();

    List<CarDTO> getCarsNeedMaintain();

    List<CarDTO> getUnavailableOrAvailableCarsByStatus(String status);

    List<CarDTO> getAvailableAndRentalCarsForReservation(String pick_up_date, String return_date, String status);

    void setCarStatusUnavailableOrAvailable(String id, String status);

    List<CarDTO> sortCarsByAttributes(CarDTO carDTO);
}
