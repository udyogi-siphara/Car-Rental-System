var customer;
var customer_nic;
let baseUrl = "http://localhost:8080/02_Back_End_war_exploded/";

/*Save Customer*/
$('#btnInSignupSpa').click(function () {
    registerCustomer();
});
/*Update Customer*/
$("#btnUpdateSpa").click(function () {
    updateCustomer();
});

$('#btnInLoginSpa').click(function () {
    let userName = $('#customer-user-name').val();
    let password = $('#customer-password').val();

    $.ajax({
        url: baseUrl + "customer?userName=" + userName,
        method: "GET",
        success: function (resp) {
            console.log(resp.userName + "=" + resp.data.userName)
            console.log(resp.userName + "=" + userName)
            if (resp.data.userName === userName && resp.data.password === password) {
                $('#spaMainIndex').css('display', 'none');
                $('#spaCarStoreIndex').css('display', 'none');
                $('#spaCartIndex').css('display', 'block');
                $('#spaCarDetailsIndex').css('display', 'none');
                $('#spaOverviewIndex').css('display', 'none');
                $('#spaSignupIndex').css('display', 'none');
                $('#spaLoginIndex').css('display', 'none');
                $('#spaUpdateIndex').css('display', 'none');
                sendVehicleNameToCart();
                loadCart();
            } else {
                alert("Username or Password Incorrect!.");
            }

        }
    });
});


/*CUSTOMER FUNCTIONS*/

/*Register Customer*/

/*function registerCustomer(){
    var Vdata = new FormData();

    let nicFileName =$("#register-form-NIC-image-signup")[0].files[0].name;

    let nicImg =$("#register-form-NIC-image-signup")[0].files[0];

    let customerId;
    let name =  $("#name-signup").val();
    let email= $("#email-signup").val();
    let nic= $("#nic-signup").val();
    let address = $("#address-signup").val();
    let contactNumber =$("#contact-signup").val();
    let drivingLicenseNo= $("#driving-license-signup").val();
    let password =$("#password-signup").val();
    let user_name= $("#username-signup").val();
    let image = nicFileName;

    var CustomerDTO = {
        customerId:"C005",
        nic: nic,
        address: address,
        contactNumber: contactNumber,
        name: name,
        drivingLicenseNumber: drivingLicenseNo,
        email: email,
        password:password,
        userName:user_name,
        image:"uploads/"+ image,
    }

    Vdata.append("nImageFile" , nicImg)
    Vdata.append("customer", new Blob([JSON.stringify(CustomerDTO)], {type: "application/json"}))

    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        async: true,
        contentType: false,
        processData: false,
        data: Vdata,
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message);
                // loadAllCars("allCarDetail");

                uploadCarImages(customerId);
                console.log(resp.data.customerId+"="+customerId);

                autoGenCustomer();
                navToLogin(resp.data);

            }
        },
        error: function (err) {
            alert(err.responseJSON.message)
            console.log(err);
        }
    });

}*/

function registerCustomer() {
    let name = $("#name-signup").val();
    let email = $("#email-signup").val();
    let nic = $("#nic-signup").val();
    let address = $("#address-signup").val();
    let contactNumber = $("#contact-signup").val();
    let drivingLicenseNo = $("#driving-license-signup").val();
    let password = $("#password-signup").val();
    let user_name = $("#username-signup").val();
    let nicFileName = $("#register-form-NIC-image-signup")[0].files[0].name;

    var newDetails = {
        customerId: 'C003',
        nic: nic,
        address: address,
        contactNumber: contactNumber,
        name: name,
        drivingLicenseNumber: drivingLicenseNo,
        email: email,
        password: password,
        userName: user_name,
        imageLocation: nicFileName
    }

    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        data: JSON.stringify(newDetails),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            navToLogin(resp.data);
            /* loadImage();*/

        },
        error: function (error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });

}

function navToLogin(details) {
    $('#spaMainIndex').css('display', 'none');
    $('#spaCarStoreIndex').css('display', 'none');
    $('#spaCartIndex').css('display', 'none');
    $('#spaCarDetailsIndex').css('display', 'none');
    $('#spaOverviewIndex').css('display', 'none');
    $('#spaSignupIndex').css('display', 'none');
    $('#spaLoginIndex').css('display', 'block');

}

/*Update Customer*/
function updateCustomer() {
    var newDetails = {
        customerId: "C003",
        nic: $("#update-nic").val(),
        address: $("#update-address").val(),
        contactNumber: $("#update-contact").val(),
        name: $("#update-name").val(),
        drivingLicenseNumber: $("#update-drivingLicense").val(),
        email: $("#update-email").val(),
        password: $("#update-password").val(),
        userName: $("#update-user-name").val(),
        imageLocation: $("#update-register-form-NIC-image").val()

    }

    $.ajax({
        url: baseUrl + "customer",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(newDetails),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("Update Your Account!..")
            }
        }
    });
}

function viewAllCustomer() {
    $("#customer-view-table").empty();

    $.ajax({
        url: baseUrl + "customer",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let viewImage = customer.imageLocation;
                let row = `<tr><th scope="row">${customer.customerId}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNumber}</td><td>${customer.nic}</td><td>${customer.email}</td><td><a style="cursor: pointer" class="text-info">viewImage</a></td></tr>`;
                $("#customer-view-table").append(row);

                $("#customer-view-table>tr").off("click");
                $("#customer-view-table>tr").click(function () {
                    customer_nic = $(this).children(":eq(1)").text();
                    console.log(customer_nic)
                    $("#navViewCustomer").prop('disabled', false);
                });
            }
            autoGenCustomer();
        }
    });
}


/*VALIDATIONS*/
//validation start For Registration

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



