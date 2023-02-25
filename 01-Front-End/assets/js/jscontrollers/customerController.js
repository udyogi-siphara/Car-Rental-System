var customer;
var customer_nic;
let baseUrl = "http://localhost:8080/carRental/"

/*Save Customer*/
$('#btnInSignupSpa').click(function (){
    registerCustomer();
});
/*Update Customer*/
$("#btnUpdateSpa").click(function (){
    updateCustomer();
})



/*CUSTOMER FUNCTIONS*/

/*Register Customer*/
function registerCustomer(){
    let name =  $("#name-signup").val();
    let email= $("#email-signup").val();
    let nic= $("#nic-signup").val();
    let address = $("#address-signup").val();
    let contactNumber =$("#contact-signup").val();
    let drivingLicenseNo= $("#driving-license-signup").val();
    let password =$("#password-signup").val();
    let user_name= $("#username-signup").val();
    let nicFileName = $("#register-form-NIC-image-signup")[0].files[0].name;

    var newDetails = {
        customerId:"C002",
        nic: nic,
        address: address,
        contactNumber: contactNumber,
        name: name,
        drivingLicenseNumber: drivingLicenseNo,
        email: email,
        password:password,
        userName:user_name,
        imageLocation: nicFileName
    }

    $.ajax({
        url: baseUrl+"customer",
        method :"post",
        data : JSON.stringify(newDetails),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            navToLogin(resp.data);
           /* loadImage();*/

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });

}


function navToLogin(details){
    $('#spaMainIndex').css('display','none');
    $('#spaCarStoreIndex').css('display','none');
    $('#spaCartIndex').css('display','none');
    $('#spaCarDetailsIndex').css('display','none');
    $('#spaOverviewIndex').css('display','none');
    $('#spaSignupIndex').css('display','none');
    $('#spaLoginIndex').css('display','block');

}

/*Update Customer*/
function updateCustomer(){
    var newDetails = {
        customerId:"C001",
        nic: $("#update-nic").val(),
        address: $("#update-address").val(),
        contactNumber: $("#update-contact").val(),
        name: $("#update-name").val(),
        drivingLicenseNumber: $("#update-drivingLicense").val(),
        email: $("#update-email").val(),
        password:$("#update-password").val(),
        userName:$("#update-user-name").val(),
        imageLocation: $("#update-register-form-NIC-image").val()

        /*customerId:"C001",
        nic:"235656565",
        address:"horana",
        contactNumber: "021223333",
        name: "sippi",
        drivingLicenseNumber:"5555555566666",
        email: "sipp23@gmail.com",
        password:"55sip",
        userName:"sip55",
        imageLocation: "outline_call_black_24dp.png"*/
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
                alert("Cant update your Details in this moment")
            }
        }
    });
}