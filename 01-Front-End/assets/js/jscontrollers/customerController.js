var customer;
var customer_nic;
let baseUrl = "http://localhost:8080/carRental/"

/*Save Customer*/
$('#btnInSignupSpa').click(function (){
    registerCustomer();
});
/*Update Customer*/
$(".btnupdateInfo").click(function (){
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
        customerId:"C001",
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
        nic: $("#customerNic").val(),
        address: $("#customerAddress").val(),
        contactNumber: $("#customerMobile").val(),
        name: $("#customerName").val(),
        email: $("#customerEmail").val(),
        password: customer.password,
        user_name: customer.user_name,
        imageLocation: customer.imageLocation,
    }

    $.ajax({
        url: baseUrl + "customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newDetails),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("Cant update your Details in this moment")
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}