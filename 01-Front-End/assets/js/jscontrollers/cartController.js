var carNames = sendVehicleNameToCart(); /*Benz, BMW, Premio */
// console.log(carNames);


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
                                <input aria-label="Checkbox for following text input" class="form-check-input mt-0 cart-driver-chex-box"
                                       type="checkbox"
                                       value="">&nbsp;Need
                            </div>
                        </td>

                        <td>
                            <div class="w-100">
                                <input class="form-control register-form-NIC-image1" id="" style="border: 1px solid gray"
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
    deleteCartItem();
    checkDriver();
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
        console.log("CheckBox "+"===="+$('.cart-driver-chex-box').prop('checked'))

    })
}

