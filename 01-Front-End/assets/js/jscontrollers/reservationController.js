function rentalVerification(){
    $("#reservation-div").empty();

    $.ajax({
        url: baseUrl + "reservation",
        method: "GET",
        success: function (resp) {
            for (const rental of resp.data) {
                let row = `<!-- Sales Card -->
                        <div class="col-xxl-4 col-md-12">
                            <div class="card info-card sales-card mt-5">

                                <div class="card-body">
                                    <div class="d-flex align-items-center" style="margin-top: 5px">
                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.customer.customerId}</h6>
                                            <p style="font-size: 15px">Customer</p>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.pickupDate}</h6>
                                            <p style="font-size: 15px">Pickup Date</p>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.pickupLocation}</h6>
                                            <p style="font-size: 15px">Pickup Location</p>
                                        </div>

                                        <div class="col-sm-3">
                                            <i data-btnAc="${rental.rentalId}" style="color: limegreen; font-size: 20px; cursor: pointer" class="bi bi-check-circle btnAccept"></i>
                                            <p style="color: limegreen; font-size: 15px">Accept</p>
                                        </div>
                                    </div>

                                    <div class="d-flex align-items-center">
                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.driverStatus}</h6>
                                            <p style="font-size: 15px">Driver</p>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.returnDate}</h6>
                                            <p style="font-size: 15px">Return Date</p>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.returnLocation}</h6>
                                            <p style="font-size: 15px">Return Location</p>
                                        </div>
                                    </div>


                                    <div class="d-flex align-items-center">
                                        <div class="col-sm-3">
                                            <h6 style="color: black; font-size: 15px">${rental.car.registrationId}</h6>
                                            <p style="font-size: 15px">Vehicle</p>
                                        </div>

                                        <div class="col-sm-3">

                                        </div>

                                        <div class="col-sm-3">
                                            <p style="color: blue; font-size: 15px"><a href="">View Image</a></p>
                                        </div>

                                        <div class="col-sm-3">
                                            <i data-btnDny="${rental.rentalId}" style="color: orangered; font-size: 20px; cursor: pointer" class="bi bi-x-circle btnDeny"></i>
                                            <p style="color: orangered; font-size: 15px">Deny</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div><!-- End Sales Card -->`;
                $("#reservation-div").append(row);

            }

            acceptClick();
            denyClick();

        }
    });
}

function acceptClick() {
    $(".btnAccept").click(function () {
        let rAId=$(this).attr("data-btnAc");
        console.log(rAId);

    })
}

function denyClick() {
    $(".btnDeny").click(function () {
        let rDId=$(this).attr("data-btnDny");
        console.log(rDId);

    })
}