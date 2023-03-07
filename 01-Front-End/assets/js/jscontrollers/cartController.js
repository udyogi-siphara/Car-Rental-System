var carNames = sendVehicleNameToCart();
var rentalAr = [];
var dayCount = 0;
var driverPayment = 0;
var amount=0;
var cusId;


var curDay = function (sp) {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (mm + sp + dd + sp + yyyy);
};

function loadCart() {
    $("#cart-table").empty();

    for (let i = 0; i < carNames.length; i++) {
        let cRow = `<tr>
                        <th scope="row">${carNames[i].model}</th>
                        <td><a class="text-primary fw-bold" href="#">${carNames[i].dRate}</a></td>
                        <td class="fw-bold">${carNames[i].mRate}</td>
                        <td>${carNames[i].dWaiver}</td>
                        <td>${carNames[i].pickupD}</td>
                        <td>${carNames[i].returnD}</td>

                        <td>
                            <div class="input-group-text">
                                <input data-cartDriverCheckBoxRegId="${carNames[i].regId}" aria-label="Checkbox for following text input" class="form-check-input mt-0 cart-driver-chex-box"
                                       type="checkbox"
                                       value="">&nbsp;Need
                            </div>
                        </td>

                        <td>
                            <div class="w-100">
                                <input data-slip="${carNames[i].regId}" data-sf="${this}" class="form-control register-form-NIC-image1" id="" style="border: 1px solid gray"
                                       type="file">
                            </div>
                        </td>
                        <td><i data-crtClose="${carNames[i].model}" class="icon-cart-close bi bi-x-circle-fill"></i></td>
                        
                        
                  </tr>`;

        $("#cart-table").append(cRow);
        let pdt = carNames[i].pickupD;
        let rdt = carNames[i].returnD;
        console.log(pdt);
        console.log(rdt);
    }
    addRentalTOTheRentAr();

    checkDriver();
    deleteCartItem();
    getDateRange();
    getAmount();
    getLocations();
    setSlip();
}

function deleteCartItem() {
    $(".icon-cart-close").click(function () {

        // console.log("CArt  Close"+"---"+$(this).attr("data-crtClose"));

        let boolCart=false;

        for(let i=0;i<vNameAr.length;i++){
            // console.log(vNameAr[i].model+"==="+$(this).attr("data-crtClose"));
            if(vNameAr[i].model===$(this).attr("data-crtClose")){
                btnColourRemover(vNameAr[i].btnR);
                //console.log(vNameAr[i]+"==="+$(param).attr("data-btnRentIt"));
                boolCart=true;
            }
        }

        if(boolCart){
            for (var i = 0; i < vNameAr.length; i++) {
                if (vNameAr[i].model === $(this).attr("data-crtClose")) {
                    vNameAr.splice(i, 1);
                    break;
                }
            }
        }
        loadCart();

    })
}


function btnColourRemover(pr) {

    // console.log("Color Remover :"+"-=====-"+$(pr).attr("data-btnRentIt"));
    $(pr).text("Add To Cart");
    $(pr).css({
        "background":"#F7F7F7",
        "color":"#444444",
    });
}


function checkDriver() {
    $(".cart-driver-chex-box").click(function () {
        /*console.log($(this).attr("data-cartDriverCheckBoxRegId"));*/

        for (let i = 0; i < rentalAr.length; i++) {
            /*console.log(rentalAr[i].rentalId + "==========================" + $(this).attr("data-cartDriverCheckBoxRegId"));*/

            if (rentalAr[i].rentalId === $(this).attr("data-cartDriverCheckBoxRegId")) {


                if (rentalAr[i].driver === "No") {

                    rentalAr[i].driver = "Yes";
                    driverPayment = parseInt(driverPayment) + (1000 * parseInt(dayCount));
                    $("#driverCost").text(driverPayment);


                } else if (rentalAr[i].driver === "Yes") {
                    driverPayment = parseInt(driverPayment) - (1000 * parseInt(dayCount));
                    $("#driverCost").text(driverPayment);


                    rentalAr[i].driver = "No";

                }
            }
        }

    })
}

function addRentalTOTheRentAr() {
    rentalAr.length = 0;
    for (let i = 0; i < carNames.length; i++) {
        console.log("Rent Id : " + carNames[i].regId);
        var rentalObj = {
            rentalId: carNames[i].regId,
            amount: amount,
            date: curDay("-"),
            pickupDate: carNames[i].pickupD,
            pickupLocation: $("#addressPickUp").val(),
            rentalDate: carNames[i].returnD,
            returnLocation: $("#addressReturn").val(),
            totalDamageWaiverPayment: carNames[i].dWaiver,
            cusId: "C001",
            driver: "No",
            img:new FormData(),
        }
        rentalAr.push(rentalObj);
    }
}


function getDateRange() {
    // To set two dates to two variables
    var date1 = new Date(carNames[0].pickupD);
    var date2 = new Date(carNames[0].returnD);

// To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
    dayCount = Difference_In_Time / (1000 * 3600 * 24);
    $("#clzTTDays").text(dayCount);

}


function getAmount() {
    for (let i = 0; i < carNames.length; i++) {
        if (dayCount%30===0 || dayCount%60===0){
            console.log("driver Selected ="+dayCount);

            if(dayCount===30){
                // pa
                amount=parseInt(amount)+parseInt(carNames[i].mRate);
                rentalAr[i].amount=parseInt(carNames[i].mRate);
            }else if(dayCount===60){
                amount=2*(parseInt(amount)+(parseInt(carNames[i].mRate)));
                rentalAr[i].amount=2*(parseInt(carNames[i].mRate));
            }

        }else{
            console.log("dayCount ="+ dayCount);
            amount=parseInt(amount)+(parseInt(carNames[i].dRate)*dayCount);
            rentalAr[i].amount=parseInt(carNames[i].dRate)*dayCount;
        }
    }

    $("#totalRentAmount").text(amount);
}

function getLocations() {

    $("#addressPickUp").keyup(function () {

        for (let i = 0; i < rentalAr.length; i++) {
            rentalAr[i].pickupLocation=$("#addressPickUp").val();
        }
    })

    $("#addressReturn").keyup(function () {

        for (let i = 0; i < rentalAr.length; i++) {
            rentalAr[i].returnLocation=$("#addressReturn").val();
        }
    })
}


/*function setSlip() {
    $(".slipPicker").change(function () {
        for (let i = 0; i < rentalAr.length; i++) {

            if (rentalAr[i].rentalId === $(this).attr("data-slip")) {
                var data = new FormData();
                let slip_img = $(this)[0].files[0];

                rentalAr[i].img.append("file",slip_img);
            }
        }
    })
}*/

function saveRental() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    for (let i = 0; i < rentalAr.length; i++) {
        var data = new FormData();

        data.append("file", rentalAr[i].img);

        let reservation = {
            rentalId: "R001",
            date: today,
            pickupDate: rentalAr[i].pickupDate,
            amount: rentalAr[i].amount,
            returnDate: rentalAr[i].rentalDate,
            totalDamageWaiverPayment: rentalAr[i].totalDamageWaiverPayment,
            pickupLocation: rentalAr[i].pickupLocation,
            returnLocation: rentalAr[i].returnLocation,
            bankSlip:rentalAr[i].img,
            noOfDays:dayCount,
            reservationStatus: "Pending",
            driverStatus: rentalAr[i].driver,
            customer: {
                customerId:loggedCustomerId
            },
            car: {
                registrationId: rentalAr[i].rentalId
            },
        }
        data.append("reservation", new Blob([JSON.stringify(reservation)], {type: "application/json"}));

        $.ajax({
            url: baseUrl + "reservation",
            method: 'post',
            async: true,
            contentType:  false,
            processData: false,
            data: data,
            success: function (resp) {
                console.log(resp.data)
            },
            error: function (err) {
                console.log(err);

            }
        });
    }

}

function setSlip(){
    $('.slipPicker').on('change', () => {
        $('#tblCartDetail tr').each((index, element) => {
            console.log(index+"========="+element);

            const selectedFile = $(element).find('.slipPicker').prop('files')[0];

            rentalAr[index].img=selectedFile;


        });
    });
}

