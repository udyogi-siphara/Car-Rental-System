/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 8:45 PM
 */

package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarDTO {
    private String registrationId;
    private String Brand;
    private String type;
    private String model;
    private String fuelType;
    private String transmissionType;
    private String color;
    private int noOfPassenger;
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private long lastServiceMileage;
    private long freeServiceMileage;
    private double dailyRate;
    private double monthlyRate;
    private double priceForExtraKm;
    private String availability;

}
