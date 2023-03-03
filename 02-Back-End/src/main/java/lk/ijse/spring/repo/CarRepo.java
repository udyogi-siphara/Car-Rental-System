/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 2/17/2023
 * Time        : 9:37 PM
 */

package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;




public interface CarRepo extends JpaRepository<Car,String> {

    @Modifying
    @Transactional
    @Query(value= "UPDATE Car SET image1=:image1,image2=:image2, image3=:image3, image4=:image4 WHERE registrationId=:registrationId",nativeQuery=true)
    void updateCarFilePaths(@Param("image1")String image1,@Param("image2")String image2,@Param("image3")String image3,@Param("image4")String image4,@Param("registrationId")String registrationId);



   /* @Modifying
    @Transactional
    @Query(value= "UPDATE Car SET Brand=:brand,model=:model,dailyRate=:dailyRate,monthlyRate=:monthlyRate,damageCost=:damageCost,color=:color,availability=:status WHERE registrationId=:registrationId",nativeQuery=true)
    void updateCarDetails(@Param("brand")String brand,@Param("model")String model,@Param("dailyRate")double dailyRate,@Param("monthlyRate")double monthlyRate,@Param("damageCost")double damageCost,@Param("color")String color,@Param("status")String status,@Param("registrationId")String registrationId);*/


}
