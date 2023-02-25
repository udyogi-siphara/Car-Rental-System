var driver_nic;

/*Save Driver*/
$("#btnAddDriver").click(function (){

});


/*FUNCTIONS*/
function saveDriver(){
    var driverDTO = {
        driverId: $("#save-driver-Id").val(),
        name: $("#save-driver-nic").val(),
        nic: $("#save-driver-name").val(),
        dob: $("#save-driver-dob").val(),
        address: $("#save-driver-address").val(),
        drivingLicenseNumber: $("#save-driver-license").val(),

    }

    $.ajax({
        url: baseUrl + "driver",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(driverDTO),
        success: function (res){
            if (res.status==200){
                alert(res.message);
                loadAllDrivers();
            }
        },

        error: function(ob){
            alert(ob.responseJSON.message);
            console.log(ob.responseJSON.message)
        }
    });
}

function loadAllDrivers(){
    $("#admin-all-drivers-table").empty();

    $.ajax({
        url: baseUrl + "driver/allDriverDetail",
        method: "GET",
        success: function (resp) {
            for (const driver of resp.data) {
                let row = `<tr><td>${driver.driverNic}</td><td>${driver.driver_name}</td><td>${driver.address}</td><td>${driver.mobile}</td><td>${driver.join_date}</td></tr>`;
                $("#admin-all-drivers-table").append(row);

                $("#admin-all-drivers-table>tr").off("click");
                $("#admin-all-drivers-table>tr").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#admin-driver-viewDetailsBtn").prop('disabled', false);
                });
            }
        }
    });
}