var driver_nic;

/*Save Driver*/
$("#btnAddDriver").click(function (){
    saveDriver();
});

/*Update Driver*/
$("#btnUpdateDriver").click(function (){
    updateDriver();
});

/*Delete Driver*/
$("#btnDeleteDriver").click(function (){
    $.ajax({
        url:"http://localhost:8080/02_Back_End_war_exploded/driver?id="+$("#save-driver-Id").val(),
        method:"delete",
        success(resp){
            alert(resp.message);
            loadAllDrivers();
        }
    });
    clearDriverText();
});

$('#btnDriverLoginSpa').click(function (){
    let userName = $('#driver-user-name').val();
    let password = $('#driver-password').val();

    $.ajax({
        url: baseUrl + "driverLogin?userName=" + userName,
        method: "GET",
        success: function (resp) {
            console.log(resp.userName + "=" + resp.data.userName)
            console.log(resp.userName + "=" + userName)
            if (resp.data.userName === userName && resp.data.password === password) {
                $('#spaLoginDriver').css('display', 'none');
                $('#spaScheduleDriver').css('display', 'block');
            } else {
                alert("Username or Password Incorrect!.");
            }

        }
    });
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
        status:"Available"

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
    clearDriverText();
}

function loadAllDrivers(){
    $("#admin-view-driver").empty();

    $.ajax({
        url: baseUrl + "driver",
        method: "GET",
        success: function (resp) {
            for (const driver of resp.data) {
                let row = `<tr><td>${driver.driverId}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.dob}</td><td>${driver.nic}</td><td>${driver.drivingLicenseNumber}</td><td>${driver.status}</td></tr>`;
                $("#admin-view-driver").append(row);

                $("#admin-view-driver").off("click");
                $("#admin-view-driver").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#navViewDriver").prop('disabled', false);
                });
            }
            bindRowClickEvents();
        }
    });
}

function updateDriver(){
    var newDetails = {
        driverId: $("#save-driver-Id").val(),
        name: $("#save-driver-name").val(),
        nic: $("#save-driver-nic").val(),
        dob: $("#save-driver-dob").val(),
        address: $("#save-driver-address").val(),
        drivingLicenseNumber: $("#save-driver-license").val()

    }

    $.ajax({
        url: baseUrl + "driver",
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
    clearDriverText();
}

function bindRowClickEvents() {
    $("#admin-view-driver>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let dob = $(this).children(":eq(3)").text();
        let nic = $(this).children(":eq(4)").text();
        let license = $(this).children(":eq(5)").text();

        $('#save-driver-Id').val(id);
        $('#save-driver-name').val(name);
        $('#save-driver-address').val(address);
        $('#save-driver-dob').val(dob);
        $('#save-driver-nic').val(nic);
        $('#save-driver-license').val(license);

    });
}

function clearDriverText(){
    $('#save-driver-name').val("");
    $('#save-driver-address').val("");
    $('#save-driver-dob').val("");
    $('#save-driver-nic').val("");
    $('#save-driver-license').val("");
}
