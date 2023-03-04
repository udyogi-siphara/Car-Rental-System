var registrationId;
var carList;
let vNameAr=[];
/*Save Car*/
$('#btnAddVehicle').click(function () {
    let registrationId1 = $("#save-car-reg-id").val();
    saveCar();
});

/*View Cars*/
$('#navViewVehicle').click(function () {
    viewCars();
});

/*Update Car*/
$('#btnUpdateCar').click(function (){
    viewUpdate();
});

/*Delete Car*/
$('#btnDeleteCar').click(function (){
    $.ajax({
        url:"http://localhost:8080/02_Back_End_war_exploded/car?id="+$("#update-car-Id").val(),
        method:"delete",
        success(resp){
            alert(resp.message);
            viewCars();
        }
    });
    clearCarTextUpdate();
});



/*FUNCTIONS*/
/*function getCarIds(){
    $("#cmbVehicleId").empty();

    $.ajax({
        url: baseUrl + "car",
        method: "GET",
        success: function (resp) {
            for (const car of resp.data) {
                let row = `<select id="cmbVehicleId" aria-label="form-select-lg example" class="form-select form-select-ls ">
                                            <option>Vehicle Id</option>
                                            <option></option>

                                        </select>`;
                console.log(car.registrationId);
                $("#cmbVehicleId").append(row);

                $("#cmbVehicleId").off("click");
                $("#cmbVehicleId").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#navViewDriver").prop('disabled', false);
                });
            }
            bindRowClickEvents();
        }
    });
}*/

/*Admin Car Functions*/
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
    clearCarText();
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
    clearCarText();
}

function viewUpdate(){

        let registrationId= $('#update-car-Id').val();
        let dailyRate= $('#update-car-dailyRate').val();
        let monthlyRate= $('#update-car-monthlyRate').val();
        let damageCost= $('#update-car-damagecost').val();
        let lastServiceMileage= $('#update-car-lastmileage').val();
        let freeServiceMileage= $('#update-car-freemileage').val();
        let priceForExtraKm= $('#update-car-exkm').val();
        let color= $('#update-car-color').val();
        let availability= $('#update-car-status').val();

    var view= {
        registrationId: registrationId,
        dailyRate:dailyRate,
        monthlyRate: monthlyRate,
        damageCost: damageCost,
        lastServiceMileage: lastServiceMileage,
        freeServiceMileage: freeServiceMileage,
        priceForExtraKm: priceForExtraKm,
        color: color,
        availability:availability,

        model:model,
        brand:brand,
        type:type,
        noOfPassenger: noOfPassenger,
        transmissionType:transmissonType,
        fuelType:fuelType,
        image1:image1,
        image2:image2,
        image3:image3,
        image4:image4,



    }

    $.ajax({
        url: baseUrl + "car",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(view),
        success: function (res) {
            viewCars();
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert('Updated!');
                clearCarTextUpdate();
            }
        }
    });


}

function viewCars(path) {
    $("#admin-view-car").empty();
    /* $("#view-car-container").empty();*/

    $.ajax({
        url: baseUrl + "car/" + path,
        method: "GET",
        success: function (resp) {
            model=resp.model;
            brand=resp.brand;
            type=resp.type;
            noOfPassenger=resp.noOfPassenger;
            transmissonType=resp.transmissionType;
            fuelType=resp.fuelType;
            image1=resp.image1;
            image2=resp.image2;
            image3=resp.image3;
            image4=resp.image4;

            for (const car of resp.data) {
                let row = `<tr><td>${car.registrationId}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.damageCost}</td><td>${car.lastServiceMileage}</td><td>${car.freeServiceMileage}</td><td>${car.priceForExtraKm}</td><td>${car.color}</td><td>${car.availability}</td></tr>`;
                $("#admin-view-car").append(row);

                $("#admin-view-car").off("click");
                $("#admin-view-car").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#navViewVehicle").prop('disabled', false);
                });
            }
            bindRowClickEvents();



            /*let div = ` <!-- Sales Card -->
                    <div class="col-xxl-4 col-md-12">
                        <div class="card info-card sales-card mt-5" style="width: 901px">

                            <div class="card-body">
                                <div class="d-flex align-items-center" style="margin-top: 5px; width: 782px">
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
                                        <button data-dtaRegId="${car.registrationId}" data-dtaBrand="${car.brand}" data-dtaModel="${car.model}" data-dtaDrate="${car.dailyRate}" data-dtaMrate="${car.monthlyRate}" data-dtaDamage="${car.damageCost}" data-dtaStatus="${car.status}" class="btn btn-primary btnViewUpdate" data-bs-toggle="modal"
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
                                    <input type="text" class="txtVehicleId-update form-control vhId">
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
                                <div >
                                    <label for="vhStatus" class="col-form-label">Status:</label>
                                    <input type="text" class="txtVehicleStatus-update form-control vhStatus">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btnUpdateCar btn btn-primary data-bs-dismiss="modal">Update</button>
                            <button type="button" class="btnDeleteCar btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
     </div>
</div>
</div><!-- End Sales Card -->`;*/
            /*$("#view-car-container").append(div);*/



            /*function viewUpdateCar() {
                var view= {
                    regId: $('.txtVehicleId-update').attr('value',car.registrationId),
                    brand: $('.txtVehicleBrand-update').attr('value','data-dtaBrand'),
                    model: $('.txtVehicleModel-update').attr('value','data-dtaModel'),
                    drate: $('.txtVehicleDaily-update').attr('value','data-dtaDrate'),
                    mrate: $('.txtVehicleMonthly-update').attr('value','data-dtaMrate'),
                    damCost: $('.txtVehicleDamage-update').attr('value','data-dtaDamage'),
                    status: $('.txtVehicleStatus-update').attr('value','data-dtaStatus')
                }

                console.log($('.txtVehicleId-update').attr("data-dtaRegId"));

                $.ajax({
                    url: baseUrl + "car",
                    method: "put",
                    contentType: "application/json",
                    data: JSON.stringify(view),
                    success: function (res) {
                        if (res.status === 200) {
                            alert(res.message)
                        } else {
                            alert('Cannot Update.');
                        }
                    }
                });
            }*/

            /*$('.btnViewUpdate').click(function () {
                viewUpdateCar();
            });*/

        }


    });
}

function clearCarTextUpdate() {
    $('#update-car-Id,#update-car-dailyRate,#update-car-monthlyRate,#update-car-damagecost,#update-car-lastmileage,#update-car-freemileage,#update-car-exkm,#update-car-color,#update-car-status').val("");
}

function clearCarText() {
    $('#save-car-reg-id,#save-car-brand,#save-car-type,#save-car-model,#save-car-transmission,#save-car-color,#save-car-passenger,#save-car-last-km,#save-car-free-mileage,#save-car-fuel,#save-car-dailyRate,#save-car-monthlyRate,#save-car-pr-ex-km,#save-car-damage,#save-car-availability').val("");
}

function bindRowClickEvents() {
    $("#admin-view-car>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let dRate = $(this).children(":eq(1)").text();
        let mRate = $(this).children(":eq(2)").text();
        let damage = $(this).children(":eq(3)").text();
        let last = $(this).children(":eq(4)").text();
        let free = $(this).children(":eq(5)").text();
        let extra = $(this).children(":eq(6)").text();
        let color = $(this).children(":eq(7)").text();
        let status = $(this).children(":eq(8)").text();


        $('#update-car-Id').val(id);
        $('#update-car-dailyRate').val(dRate);
        $('#update-car-monthlyRate').val(mRate);
        $('#update-car-damagecost').val(damage);
        $('#update-car-lastmileage').val(last);
        $('#update-car-freemileage').val(free);
        $('#update-car-exkm').val(extra);
        $('#update-car-color').val(color);
        $('#update-car-status').val(status);

    });
}


/*Cart And Car Store Functions*/
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
                                        <div class="icon"><img id="car-img" alt="" src=${"http://localhost:8080/02_Back_End_war_exploded/"+car.image3} style="width: 250px;height: 175px"></i></div>
                                    </div>
                                </div>


                                <!--Title/V Name-->
                                <div class="row">
                                    <div class="d-flex justify-content-center">
                                        <h6 id="car-model" style="text-align: center"><a href="">${car.brand} ${car.model}</a></h6>
                                    </div>
                                </div>


                                <!--Type-->
                                <div class="row mt-5">
                                    <h6 class="d-flex justify-content-center col-xl-6" style="display: inline">${car.fuelType}</h6>
                                    <h6 class="d-flex justify-content-center col-xl-6" style="display: inline">${car.transmissionType}</h6>
                                </div>

                                <!--Line-->
                                <div id="lineHome"></div>

                               


                                <!--Price-->
                                <div class="row mt-5">
                                    <div id="car-dailyRate" class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
                                         style="font-weight: 900">${car.dailyRate}
                                    </div>
                                    <div id="car-monthlyRate" class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
                                         style="font-weight: 900">${car.monthlyRate}
                                    </div>
                                    <div id="car-damageCost" class="d-flex align-items-sm-stretch col-xl-4 text-danger justify-content-center"
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
                                        <button  data-dtaImg="${car.image3}"  data-dtaDailyRate="${car.dailyRate}" data-dtaMonthlyRate="${car.monthlyRate}" data-dtaWawier="${car.damageCost}" data-btnRentIt="${car.model}" class="btnAddToCart">Add To Cart</button>
                                    </div>
                                    <div class="d-flex align-items-sm-stretch col-xl-4 justify-content-center">
                                        <img class="iconCarDetail" alt="" height="35" src="../assets/img/icons8-popup-50.png" width="35">
                                    </div>
                                </div>


                            </div>
                        </div>`;

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

function rentItClick() {
    const buttons = document.querySelectorAll('.btn_RentIt');


    $(".btnAddToCart").click(function () {
        var bgColor = $(this).css("background-color");
        console.log(bgColor)

        // let x=$(this).dataset.btnRentIt;
        console.log($(this).attr("data-btnRentIt"));
        setBrandToArray(this);

        /*console.log(colorsAreEqual(bgColor, "rgb(35, 31, 237)"))*/

        if(colorsAreEqual(bgColor, "rgb(35, 31, 237)")){ //firstTime With hover
            $(this).text("Added");
            console.log($(this).text("Added"));
            $(this).css({
                "background":"#ffffff",
                "color":"#D50137",
                "border-color":"#D50137"
            });

        }else if(colorsAreEqual(bgColor, "rgb(255,255,255)")){ //red
            $(this).text("Add To Cart");
            console.log('awa');
            $(this).css({
                "background":"#DBDCECFF",
                "color":"#444444",
            });
        }else if(colorsAreEqual(bgColor, "rgb(219,220,236)")){ //red turn to past value
            $(this).text("Added");
            $(this).css({
                "background":"#ffffff",
                "color":"#D50137",
                "border-color":"#D50137"
            });
        }
    });


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

function setBrandToArray(param) {
    let bool=true;
    let isDateAdd=false;

    var rDate="";
    var pDate="";

    if($("#car_Store_pickup_date-gen").val() && $("#car_Store_return_date-gen").val() ){
       /* console.log("Value "+"======"+$("#car_Store_pickup_date-gen").val())*/
        isDateAdd=true;
        pDate=$("#car_Store_pickup_date-gen").val();
        rDate=$("#car_Store_return_date-gen").val();

    }else if($("#car_Store_pickup_date-pre").val() && $("#car_Store_Return_date-pre").val() ){
        /*console.log("Value "+"======"+$("#car_Store_pickup_date-pre").val());*/
        isDateAdd=true;
        pDate=$("#car_Store_pickup_date-pre").val()
        rDate=$("#car_Store_Return_date-pre").val();

    }else if($("#car_Store_pickup_date-lux").val() && $("#car_Store_Return_date-lux").val()) {
        /*console.log("Value "+"======"+$("#car_Store_Return_date-lux").val());*/
        isDateAdd=true;
        pDate=$("#car_Store_pickup_date-lux").val()
        rDate=$("#car_Store_Return_date-lux").val()
    }



    var cus={
        model:$(param).attr("data-btnRentIt"),
        imag:$(param).attr("data-dtaImg") ,
        dRate:$(param).attr("data-dtaDailyRate") ,
        mRate:$(param).attr("data-dtaMonthlyRate") ,
        dWaiver:$(param).attr("data-dtaWawier") ,
        tnRent:$(param).attr("data-btnRentIt") ,
        pickupD:pDate,
        returnD:rDate,
    }

    // let elementToRemove = $(param).attr("data-btnRentIt");
    // alert(elementToRemove);
    // let index = vNameAr.indexOf(elementToRemove.parentElement);


    for(let i=0;i<vNameAr.length;i++){
        console.log(vNameAr[i].model+"==="+$(param).attr("data-btnRentIt"));
        if(vNameAr[i].model===$(param).attr("data-btnRentIt")){
            //console.log(vNameAr[i]+"==="+$(param).attr("data-btnRentIt"));
            bool=false;
        }
    }


    if(bool){
        // vNameAr.push($(param).attr("data-btnRentIt"));
        vNameAr.push(cus);
    }else{
        /*console.log("index-"+index )
        if (index > -1) {
            vNameAr.splice(index, 1);
        }*/

        for (var i = 0; i < vNameAr.length; i++) {
            if (vNameAr[i].model === $(param).attr("data-btnRentIt")) {
                vNameAr.splice(i, 1);
                break;
            }
        }

    }

    /*======================*/

}

function sendVehicleNameToCart() {
    return vNameAr;
}






/*VALIDATIONS*/
//validation start

const cusNICRegEx = /^[0-9/A-z]{10,15}$/;
const cusDrivingRegEx = /^[0-9/A-z]{9}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[0-9]{3}[-]?[0-9]{7}$/;
const cusEmailRegEx = /^[a-z0-9]{3,}[@]?[a-z]{1,}[.]?[a-z]{2,}$/;
const cusPasswordRegEx = /^[a-z0-9]{6}$/;
const cusUseNameRegEx = /^[a-z ]{6}$/;


$('#name-signup,#email-signup,#nic-signup,#address-signup,#contact-signup,#driving-license-signup,#username-signup,#password-signup').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#name-signup,#email-signup,#nic-signup,#address-signup,#contact-signup,#driving-license-signup,#username-signup,#password-signup').on('blur', function () {
    formValid();
});


$("#name-signup").on('keyup', function (eventOb) {
    setButton();


});
$("#email-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#address-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#contact-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#driving-license-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#username-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
$("#password-signup").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

// focusing events end
$("#btnInSignupSpa").attr('disabled', true);

function clearAll() {
    $('#name-signup,#email-signup,#nic-signup,#address-signup,#contact-signup,#driving-license-signup,#username-signup,#password-signup').val("");
    $('#name-signup,#email-signup,#nic-signup,#address-signup,#contact-signup,#driving-license-signup,#username-signup,#password-signup').css('border', '2px solid #ced4da');
    $('#name-signup').focus();
    $("#btnInSignupSpa").attr('disabled', true);

    /*$("#lblDriverNIC,#lblDriverName,#lblDriverAdress,#lblDriverContact,#lblDriverEmail").text("");*/

}

function formValid() {
    var cusName = $("#name-signup").val();
    $("#name-signup").css('border', '2px solid green');
    $("#lblCusName").text("");
    if (cusNameRegEx.test(cusName)) {
        var cusEmail = $("#email-signup").val();
        if (cusEmailRegEx.test(cusEmail)) {
            $("#email-signup").css('border', '2px solid green');
            $("#lblCusEmail").text("");
            var cusNic = $("#nic-signup").val();
            if (cusNICRegEx.test(cusNic)) {
                $("#nic-signup").css('border', '2px solid green');
                $("#lblCusNic").text("");
                var cusAddress = $("#address-signup").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    $("#address-signup").css('border', '2px solid green');
                    $("#lblCusAddress").text("");
                    var carContact = $("#contact-signup").val();
                    if (cusContactRegEx.test(carContact)) {
                        $("#contact-signup").css('border', '2px solid green');
                        $("#lblCusContact").text("");
                        var carDrivingLice = $("#driving-license-signup").val();
                        if (cusDrivingRegEx.test(carDrivingLice)) {
                            $("#driving-license-signup").css('border', '2px solid green');
                            $("#lblCusLicense").text("");
                            var carUser = $("#username-signup").val();
                            if (cusUseNameRegEx.test(carUser)) {
                                $("#username-signup").css('border', '2px solid green');
                                $("#lblCusUserName").text("");


                                var cusPassword = $("#password-signup").val();
                                if (cusPasswordRegEx.test(cusPassword)) {
                                    $("#password-signup").css('border', '2px solid green');
                                    $("#lblCusPassword").text("");
                                    return true;
                                } else {
                                    $("#password-signup").css('border', '2px solid red');
                                    $("#lblCusPassword").text("Invalid Please Enter Again(Ex :Please must be include only letters and numbers at least 6");
                                    return false;
                                }
                            } else {
                                $("#username-signup").css('border', '2px solid red');
                                $("#lblCusUserName").text("Invalid Please Enter Again(Ex :Please must be include only letters at least 6");
                                return false;
                            }
                        } else {
                            $("#driving-license-signup").css('border', '2px solid red');
                            $("#lblCusLicense").text("Invalid Please Enter Again(Ex : 45645645L");
                            return false;
                        }
                    } else {
                        $("#contact-signup").css('border', '2px solid red');
                        $("#lblCusContact").text("Invalid Please Enter Again(Ex :0714524520)");
                        return false;
                    }
                } else {
                    $("#address-signup").css('border', '2px solid red');
                    $("#lblCusAddress").text("Invalid Please Enter Again(Ex : 02,Bibile)");
                    return false;
                }
            } else {
                $("#nic-signup").css('border', '2px solid red');
                $("#lblCusNic").text("Invalid Please Enter Again(Ex : 200108202209 / 20010820220V)");
                return false;
            }
        } else {
            $("#email-signup").css('border', '2px solid red');
            $("#lblCusEmail").text("Invalid Please Enter Again(Ex : udyogi12@gmail.com)");
            return false;
        }
    } else {
        $("#name-signup").css('border', '2px solid red');
        $("#lblCusName").text("Invalid Please Enter Again(Ex : Udyogi)");
        return false;
    }
}

function checkIfCustValid() {
    var cusName = $("#name-signup").val();
    if (cusNameRegEx.test(cusName)) {
        $("#email-signup").focus();
        var cusEmail = $("#email-signup").val();
        if (cusEmailRegEx.test(cusEmail)) {
            $("#nic-signup").focus();
            var cusNic = $("#nic-signup").val();
            if (cusNICRegEx.test(cusNic)) {
                $("#address-signup").focus();
                var cusAddress = $("#address-signup").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    $("#contact-signup").focus();
                    var cusContact = $("#contact-signup").val();
                    if (cusContactRegEx.test(cusContact)) {
                        $("#driving-license-signup").focus();
                        var cusDrivingLic = $("#driving-license-signup").val();
                        if (cusDrivingRegEx.test(cusDrivingLic)) {
                            $("#username-signup").focus();
                            var cusUser = $("#username-signup").val();
                            if (cusUseNameRegEx.test(cusUser)) {
                                $("#password-signup").focus();
                                var cusPassword = $("#password-signup").val();
                                if (cusPasswordRegEx.test(cusPassword)) {
                                    var resp = cusPasswordRegEx.test(cusPassword);
                                    if (resp) {
                                        if ($("#register-form-NIC-image-signup").val() == "") {
                                            alert("Please Upload Driver License Image.....")
                                        } else {
                                            registerCustomer();
                                            clearAll();
                                        }
                                    }
                                } else {
                                    $("#password-signup").focus();
                                }
                            } else {
                                $("#username-signup").focus();
                            }
                        } else {
                            $("#driving-license-signup").focus();
                        }
                    } else {
                        $("#contact-signup").focus();
                    }
                } else {
                    $("#address-signup").focus();
                }

            } else {
                $("#nic-signup").focus()
            }
        } else {
            $("#email-signup").focus();
        }
    } else {
        $("#name-signup").focus();
    }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnInSignupSpa").attr('disabled', false);
    } else {
        $("#btnInSignupSpa").attr('disabled', true);
    }
}

$('#btnInSignupSpa').click(function () {
    checkIfCustValid();
});




