var productPrices = {};

$(function () {
    //Json data by api call for order table
    $.get(productListApiUrl, function (response) {
        foodPrices = {}
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, food_menu) {
                options += '<option value="'+ food_menu.product_id +'">'+ food_menu.Burger +'</option>';
                foodPrices[food_menu.product_id] = food_menu.product_price;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-total").last().text('0.0');
});

$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();
    calculateValue();
});

// $(document).on("change", ".cart-product", function (){
//     var product_id = $(this).val();
//     var price = foodPrices[product_id];

//     $(this).closest('.row').find('#product_price').val(price);
//     calculateValue();
// });

// $(document).on("change", ".product-qty", function (e){
//     calculateValue();
// });
$(document).on("change", ".cart-product", function () {
    var product_id = $(this).val();
    var price = foodPrices[product_id];
    var food_name = $(this).find("option:selected").text(); // Get the selected product name (food name)

    $(this).closest('.row').find('#product_price').val(price);
    $(this).closest('.row').find('#food_name').val(food_name); // Set the food name

    calculateValue();
});


// $("#saveOrder").on("click", function(){
//     var formData = $("form").serializeArray();
//     var requestPayload = {
//         Phone_number: null,
//         Price: null,
//         order_details: []
//     };
//     var orderDetails = [];
//     for(var i=0;i<formData.length;++i) {
//         var element = formData[i];
//         var lastElement = null;

//         switch(element.name) {
//             case 'Phonenumber':
//                 requestPayload.Phone_number = element.value;
//                 break;
//             case 'Price':
//                 requestPayload.Price = element.value;
//                 break;
//             case 'product':
//                 requestPayload.order_details.push({
//                     product_id: element.value,
//                     food_name:null,
//                     quantity: null,
//                     phone_number:null,  
//                     Total_Price: null
//                 });                
//                 break;
//             case 'qty':
//                 lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
//                 lastElement.quantity = element.value
//                 break;
//             case 'item_total':
//                 lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
//                 lastElement.Total_Price = element.value
//                 break;
//         }

//     }
//     callApi("POST", orderSaveApiUrl, {
//         'data': JSON.stringify(requestPayload)
//     });
// });
$("#saveOrder").on("click", function(){
    var formData = $("form").serializeArray();
    var requestPayload = {
        Phone_number: null,
        Price: null,
        order_details: []
    };

    var orderDetails = [];
    for (var i = 0; i < formData.length; ++i) {
        var element = formData[i];
        var lastElement = null;

        switch (element.name) {
            case 'Phonenumber':
                requestPayload.Phone_number = element.value;
                break;
            case 'Price':
                requestPayload.Price = element.value;
                break;
            case 'product':
                requestPayload.order_details.push({
                    product_id: element.value,
                    food_name: $(this).find("option:selected").text(),  
                    quantity: null,
                    phone_number: requestPayload.Phone_number,
                    Total_Price: null
                });
                break;
            case 'qty':
                lastElement = requestPayload.order_details[requestPayload.order_details.length - 1];
                lastElement.quantity = element.value;
                break;
            case 'item_total':
                lastElement = requestPayload.order_details[requestPayload.order_details.length - 1];
                lastElement.Total_Price = element.value;
                break;
        }
    }

    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});
$(document).ready(function() {
  
    $("#saveOrder").prop('disabled', true);

    
    $("#customerName").on('input', function() {
        var phoneNumber = $(this).val();
   
        if (phoneNumber.length > 10) {
            $("#phoneError").show(); 
            $("#saveOrder").prop('disabled', true); 
        } else {
            $("#phoneError").hide(); 
            if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
                $("#saveOrder").prop('disabled', false);
            } else {
                $("#saveOrder").prop('disabled', true);
            }
        }
    });


    $("#saveOrder").on("click", function(e) {
        var phoneNumber = $("#customerName").val();

        
        if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            e.preventDefault(); 
            alert("Phone number must be exactly 10 digits.");
        } else {
          
            var formData = $("form").serializeArray();
            var requestPayload = {
                Phone_number: phoneNumber,
                Price: null,
                order_details: []
            };

        }
    });
});
