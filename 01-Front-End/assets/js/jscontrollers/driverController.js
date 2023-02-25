var driver_nic;

/*Save Driver*/
$("#btnAddDriver").click(function (){
    saveDriver();
    loadAllDrivers();
});


/*FUNCTIONS*/
function saveDriver(){
    var driverDTO = {
        driverId: $("#save-driver-Id").val(),
        name: $("#save-driver-name").val(),
        nic: $("#save-driver-nic").val(),
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
    $("#admin-view-driver").empty();

    $.ajax({
        url: baseUrl + "driver",
        method: "GET",
        success: function (resp) {
            for (const driver of resp.data) {
                let row = `<tr><td>${driver.driverId}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.dob}</td><td>${driver.nic}</td><td>${driver.drivingLicenseNumber}</td><td></td></tr>`;
                $("#admin-view-driver").append(row);

                $("#admin-view-driver").off("click");
                $("#admin-view-driver").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#navViewDriver").prop('disabled', false);
                });
            }
        }
    });
}