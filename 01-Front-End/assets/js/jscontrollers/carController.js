var vehicle_no;
var carList;

/*Save Car*/
$('#btnAddVehicle').click(function () {
    let registrationId1 = $("#save-car-reg-id").val();
    saveCar();
});

/*View Cars*/
$('#navViewVehicle').click(function () {
    viewCars();
});


/*FUNCTIONS*/

function saveCar() {
    var Vdata = new FormData();

    let frontFileName =$("#save-car-back-img")[0].files[0].name;
    let backFileName = $("#save-car-front-img")[0].files[0].name;
    let sideFileName = $("#save-car-side-img")[0].files[0].name;
    let interiorFileName =$("#save-car-interior-img")[0].files[0].name;

    let vFrontImg =$("#save-car-back-img")[0].files[0]
    let vBackImg =$("#save-car-front-img")[0].files[0]
    let vSideImg =$("#save-car-side-img")[0].files[0]
    let vInteriorImg =$("#save-car-interior-img")[0].files[0]


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
    let availability = $("#save-car-availability").val();
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
        image1:"uploads/"+ image1,
        image2:"uploads/"+ image2,
        image3:"uploads/"+ image3,
        image4:"uploads/"+ image4,

    }

    Vdata.append("vImageFile" , vFrontImg)
    Vdata.append("vImageFile" , vBackImg)
    Vdata.append("vImageFile" , vSideImg)
    Vdata.append("vImageFile" , vInteriorImg)
    Vdata.append("vehicle", new Blob([JSON.stringify(CarDTO)], {type: "application/json"}))


    $.ajax({
        url: baseUrl + "car",
        method: "post",
        async: true,
        contentType: false,
        processData: false,
        data: Vdata,
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message);
                // loadAllCars("allCarDetail");

                uploadCarImages(registrationId);

            }
        },
        error: function (err) {
            alert(err.responseJSON.message)
            console.log(err);
        }
    });
    //clearSaveCarForm();
}

function uploadCarImages(registrationId) {

    let frontViewFile = $("#save-car-back-img")[0].files[0];
    let backViewFile = $("#save-car-front-img")[0].files[0];
    let sideViewFile = $("#save-car-side-img")[0].files[0];
    let interiorViewFile = $("#save-car-interior-img")[0].files[0];

    let frontFileName = registrationId + "-image1-" + $("#save-car-back-img")[0].files[0].name;
    let backFileName = registrationId + "-image2-" + $("#save-car-front-img")[0].files[0].name;
    let sideFileName = registrationId + "-image3-" + $("#save-car-side-img")[0].files[0].name;
    let interiorFileName = registrationId + "-image4-" + $("#save-car-interior-img")[0].files[0].name;


    var data = new FormData();

    data.append("image1", frontViewFile, frontFileName);
    data.append("image2", backViewFile, backFileName);
    data.append("image3", sideViewFile, sideFileName);
    data.append("image4", interiorViewFile, interiorFileName);


    $.ajax({
        url: baseUrl + "car/uploadImg/" + registrationId,
        method: "Post",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            /* Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: "Images Upload Successfully",
                 showConfirmButton: false,
                 timer: 1500
             });*/
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            /*   Swal.fire({
                   position: 'top-end',
                   icon: 'error',
                   title: "Images Not Upload Successfully",
                   showConfirmButton: false,
                   timer: 1500
               });*/
        }
    });
}

function clearCarText() {
    $('#save-car-reg-id,#save-car-brand,#save-car-type,#save-car-model,#save-car-transmission,#save-car-color,#save-car-passenger,#save-car-last-km,#save-car-free-mileage,#save-car-fuel,#save-car-dailyRate,#save-car-monthlyRate,#save-car-pr-ex-km,#save-car-damage,#save-car-availability').val("");
}

function viewCars(path) {
    /*$("#view-car-main-div").empty();*/

    $("#view-car-container").empty();

    $.ajax({
        url: baseUrl + "car/" + path,
        method: "GET",
        success: function (resp) {
            for (const car of resp.data) {

                let div = ` <!-- Sales Card -->
                        <div class="col-xxl-4 col-md-12">
                            <div class="card info-card sales-card mt-5" style="width: 901px">

                                <div class="card-body">
                                    <div class="d-flex align-items-center" style="margin-top: 5px; width: 800px">
                                        <div class="col-sm-3">
                                            <img style="width: 152px;" src=${"http://localhost:8080/02_Back_End_war_exploded/"+car.image3} alt="">
                                        </div>
                                        
                                        <div class="col-sm-3" style="margin-left: 20px">
                                            <h6 style="color: black; font-size: 15px">Vehicle Id</h6>
                                            <p style="font-size: 15px">${car.registrationId}</p>
                                        </div>

                                        <div class="col-sm-3" style="margin-left: -70px">
                                            <h6 style="color: black; font-size: 15px">${car.brand}</h6>
                                            <p style="font-size: 15px">${car.model}</p>
                                        </div>

                                        <div class="col-sm-3" style="margin-left: -96px;">
                                            <h6 style="color: black; font-size: 15px">Daily</h6>
                                            <p style="font-size: 15px">${car.dailyRate}</p>
                                        </div>

                                        <div class="col-sm-3" style="margin-left: -96px;">
                                            <h6 style="color: black; font-size: 15px">Monthly</h6>
                                            <p style="font-size: 15px">${car.monthlyRate}</p>
                                        </div>

                                        <div class="col-sm-3" style="margin-left: -86px;">
                                            <h6 style="color: black; font-size: 15px">Damage Cost</h6>
                                            <p style="font-size: 15px">${car.damageCost}</p>
                                        </div>
                                        
                                        <div class="col-sm-3" style="margin-left: -61px">
                                            <h6 style="color: black; font-size: 15px">Status</h6>
                                            <p style="font-size: 15px">${car.availability}</p>
                                        </div>

                                    </div>

                                    <div class="d-flex align-items-center" style="margin-left: 60px">
                                        <div class="col-sm-3">
                                            <button class="btnAddMaintenance btn btn-primary gap-5" style="background-color: orangered;color: white; border: none; width: 203px; margin-left: 465px">Add To Maintenance</button>
                                        </div>

                                        <div class="col-sm-3">
                                            <button class="btn btn-primary btnViewUpdate" data-bs-toggle="modal" 
                                            data-bs-target=".addItemModal" 
                                            style="background-color: blue;color: white; border: none; width: 100px; margin-left: 500px">
                                            Update</button>
                                        </div>
                                        
                                        <div class="modal fade addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
                    <div class="modal-dialog-centered modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header text-light" style="background-color:#1F1D2E ">
                                <h5 class="modal-title " id="addItemModalLabel">Update & Delete Car</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div>
                                        <label for="vhId" class="col-form-label">Vehicle Id : </label>
                                        <input type="text" class="txtVehicleId-update form-control" id="vhId" disabled>
                                    </div>
                                    <div >
                                        <label for="vhBrand" class="col-form-label">Vehicle Brand : </label>
                                        <input type="text" class="txtVehicleBrand-update form-control vhBrand">
                                    </div>
                                    <div >
                                        <label for="vhModel" class="col-form-label">Vehicle Model : </label>
                                        <input type="text" class="txtVehicleModel-update form-control vhModel">
                                    </div>
                                    <div >
                                        <label for="vhDaily" class="col-form-label">Daily Rate:</label>
                                        <input type="text" class="txtVehicleDaily-update form-control vhDaily">
                                    </div>
                                    <div >
                                        <label for="vhMonthly" class="col-form-label">Monthly Rate:</label>
                                        <input type="text" class="txtVehicleMonthly-update form-control vhMonthly">
                                    </div>
                                    <div >
                                        <label for="vhDamage" class="col-form-label">Damage Cost:</label>
                                        <input type="text" class="txtVehicleDamage-update form-control vhDamage">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btnUpdateCar btn btn-primary data-bs-dismiss="modal">Update</button>
                                <button id="btnDeleteCar" type="button" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
         </div>
    </div>
 </div><!-- End Sales Card -->`;
                $("#view-car-container").append(div);

                function viewUpdateCar() {
                    var newDetails = {
                        registrationId: $('.txtVehicleId-update').val(car.registrationId),
                        brand: $('.txtVehicleBrand-update').val(car.brand),
                        model: $('.txtVehicleModel-update').val(car.model),
                        dailyRate: $('.txtVehicleDaily-update').val(car.dailyRate),
                        monthlyRate: $('.txtVehicleMonthly-update').val(car.monthlyRate),
                        damageCost: $('.txtVehicleDamage-update').val(car.damageCost)

                    }

                    $.ajax({
                        url: baseUrl + "car",
                        method: "put",
                        contentType: "application/json",
                        data: JSON.stringify(newDetails),
                        success: function (res) {
                            if (res.status === 200) {
                                alert(res.message)
                            } else {

                            }
                        }
                    });
                }

                $('.btnViewUpdate').click(function () {
                    viewUpdateCar();
                });

            }

        }
    });
}

function loadAllCars(path) {
    $("#luxury-car-store-container").empty();

    $.ajax({
        url: baseUrl + "car/" + path,
        method: "GET",
        success: function (resp) {
            for (const car of resp.data) {
                let div = `<div class="col-xl-4 col-md-6 d-flex align-items-stretch mb-4" data-aos="zoom-in"
                             data-aos-delay="100">
                            <div class="icon-box">

                                <!--Title/V Name-->
                                <div class="row">
                                    <div class="d-flex justify-content-center">
                                        <div class="icon"><img alt="" src=${"http://localhost:8080/02_Back_End_war_exploded/"+car.image3} style="width: 250px;height: 175px"></i></div>
                                    </div>
                                </div>


                                <!--Title/V Name-->
                                <div class="row">
                                    <div class="d-flex justify-content-center">
                                        <h6 style="text-align: center"><a href="">${car.brand} ${car.model}</a></h6>
                                    </div>
                                </div>


                                <!--Type-->
                                <div class="row mt-5">
                                    <h6 class="d-flex justify-content-center col-xl-6" style="display: inline">${car.fuelType}</h6>
                                    <h6 class="d-flex justify-content-center col-xl-6" style="display: inline">${car.transmissionType}</h6>
                                </div>

                                <!--Line-->
                                <div id="lineHome"></div>

                                <!--<div class="row">
                                    <div class="d-flex ">
                                        <p class="mt-5 mb-3 ps-4 justify-content-center">The Toyota Premio is a compact
                                            sedan known for comfort,
                                            technology, and efficiency</p>
                                    </div>
                                </div>-->


                                <!--Price-->
                                <div class="row mt-5">
                                    <div class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
                                         style="font-weight: 900">${car.dailyRate}
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
                                         style="font-weight: 900">${car.monthlyRate}
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
                                         style="font-weight: 900">${car.damageCost}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-flex align-items-sm-stretch col-xl-4 justify-content-center"
                                         style="font-size: 13px">Per Day
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 justify-content-center"
                                         style="font-size: 13px">Per Month
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 justify-content-center"
                                         style="font-size: 13px">On Hold
                                    </div>
                                </div>


                                <!--Button-->
                                <div class="row mt-5">
                                    <div class="d-flex align-items-sm-stretch col-xl-8 justify-content-around">
                                        <button class="btnAddToCart">Add To Cart</button>
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 justify-content-center">
                                        <img class="iconCarDetail" alt="" height="35" src="../assets/img/icons8-popup-50.png" width="35">
                                    </div>
                                </div>


                            </div>
                        </div>`;
                /*$("#general-car-store-container").append(div);*/
                if (car.type === "General") {
                    $("#general-car-store-container").append(div);
                } else if (car.type === "Premium") {
                    $("#premium-car-store-container").append(div);
                } else if (car.type === "Luxury") {
                    $("#luxury-car-store-container").append(div);
                }

            }
            iconCarDetail();

        }
    });
}

function addToCartClick() {
    /*alert("hi");*/
    $(".btnAddToCart").click(function () {
        /*alert("hi");*/
        var bgColor = $(this).css("background-color");
        console.log(bgColor);
        $(this).text("Added");
        $(this).css({
            "background":"#231FED",
            "color":"#ffffff"
        });

        /*rgb(240, 240, 240)*/
        /*rgb(213, 1, 55)*/

        if(colorsAreEqual(bgColor, "rgb(35, 31, 237)")){
            $(this).text(" Added ");
            $(this).css({
                "background":"#ffffff",
                "color":"#D50137",
                "border-color":"#D50137"
            });
        }else if(colorsAreEqual(bgColor, "rgb(255,255,255)")){
            $(this).text("Add To Cart");
            $(this).css({
                "background":"#DBDCECFF",
                "color":"#444444",
            });
        }else if(colorsAreEqual(bgColor, "rgb(219,220,236)")){
            $(this).text("Added");
            $(this).css({
                "background":"#ffffff",
                "color":"#D50137",
                "border-color":"#D50137"
            });
        }
    })
}

function colorsAreEqual(color1, color2) {
    var rgb1 = color1.match(/\d+/g);  // Get the RGB values of color1
    var rgb2 = color2.match(/\d+/g);  // Get the RGB values of color2
    if (rgb1.length !== 3 || rgb2.length !== 3) {
        return false;  // Invalid input - not a valid color
    }
    for (var i = 0; i < 3; i++) {
        if (parseInt(rgb1[i]) !== parseInt(rgb2[i])) {
            return false;  // The colors are not equal
        }
    }
    return true;  // The colors are equal
}






