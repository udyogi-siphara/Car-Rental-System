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
        dob: $("#save-driver-address").val(),
        address: $("#save-driver-mobile").val(),
        drivingLicenseNumber: $("#save-driver-license").val(),

    }

    $.ajax({
        url: baseUrl + "driver",
        method: "POST",
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
    })

    clearDriversform();
}