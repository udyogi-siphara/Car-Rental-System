var customer;
var customer_nic;
let baseUrl = "http://localhost:8080/02_Back_End_war_exploded/"

/*Save Customer*/
$('#btnInSignupSpa').click(function (){
    registerCustomer();
});
/*Update Customer*/
$("#btnUpdateSpa").click(function (){
    updateCustomer();
});




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


function viewAllCustomer(){
    $("#customer-view-table").empty();

    $.ajax({
        url: baseUrl + "customer",
        method: "GET",
        success: function (resp){
            for (const customer of resp.data){
                let viewImage = customer.imageLocation;
                let row = `<tr><th scope="row">${customer.customerId}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNumber}</td><td>${customer.nic}</td><td>${customer.email}</td><td><a style="cursor: pointer" class="text-info">viewImage</a></td></tr>`;
                $("#customer-view-table").append(row);

                $("#customer-view-table>tr").off("click");
                $("#customer-view-table>tr").click(function (){
                    customer_nic = $(this).children(":eq(1)").text();
                    console.log(customer_nic)
                    $("#navViewCustomer").prop('disabled',false);
                });
            }
        }
    });
}