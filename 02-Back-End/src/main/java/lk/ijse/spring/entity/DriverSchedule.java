/**
 * @author : Udyogi Siphara
 * Project Name: Car _Rental_System
 * Date        : 3/8/2023
 * Time        : 11:47 AM
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity(name = "driveSchedule")
public class DriverSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int schedule_id;

    private Time start_time;
    private Date start_date;
    private Date end_date;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name="driverId")
    private Driver driver;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rentalId")
    private Rental carReservation;

}
