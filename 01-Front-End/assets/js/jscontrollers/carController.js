var vehicle_no;
var carList;

/*Save Car*/
$('#btnAddVehicle').click(function (){
    registerCar();
});




/*FUNCTIONS*/
function registerCar() {
    let backFileName = $("#save-car-back-img")[0].files[0].name;
    let frontFileName = $("#save-car-front-img")[0].files[0].name;
    let sideFileName = $("#save-car-side-img")[0].files[0].name;
    let interiorFileName = $("#save-car-interior-img")[0].files[0].name;


    let registrationId = $("#save-car-reg-id").val();
    let brand = $("#save-car-brand").val();
    let type = $("#save-car-type").val();
    let model = $("#save-car-model").val();
    let transmissionType = $("#save-car-transmission").val();
    let color = $("#save-car-color").val();
    let noOfPassenger = $("#save-car-passenger").val();
    let lastServiceMileage = $("#save-car-last-km").val();
    let freeServiceMileage = $("#save-car-free-mileage").val();
    let fuelType = $("#save-car-fuel").val();
    let dailyRate = $("#save-car-dailyRate").val();
    let monthlyRate = $("#save-car-monthlyRate").val();
    let priceForExtraKm = $("#save-car-pr-ex-km").val();
    let damage = $('#save-car-damage').val();
    let availability = "null";
    let image1 = backFileName;
    let image2 = frontFileName;
    let image3 = sideFileName;
    let image4 = interiorFileName;

    var CarDTO = {
        registrationId: registrationId,
        brand: brand,
        type: type,
        model: model,
        transmissionType: transmissionType,
        color: color,
        noOfPassenger: noOfPassenger,
        lastServiceMileage: lastServiceMileage,
        freeServiceMileage: freeServiceMileage,
        fuelType: fuelType,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        priceForExtraKm: priceForExtraKm,
        damageCost: damage,
        availability: availability,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4
    }

    $.ajax({
        url: baseUrl + "car",
        method: 'post',
        //async: true,
        contentType: "application/json",
        //processData: false,
        data: JSON.stringify(CarDTO),
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message);
                // loadAllCars("allCarDetail");
                /*loadImage();*/

            }
        },
        error: function (err) {
            alert(err.responseJSON.message)
            console.log(err);
        }
    });
}
