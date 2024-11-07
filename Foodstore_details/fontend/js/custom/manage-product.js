var productModal = $("#productModal");
var  productModal1 = $("#productModal1");

    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, food_menu) {
                    table += '<tr data-id="'+ food_menu.product_id +'" data-name="'+ food_menu.Burger +'" data-unit="'+ food_menu.ckn_bf +'" data-price="'+ food_menu.product_price  +'">' +
                        '<td>'+ food_menu.Burger +'</td>'+
                        '<td>'+ food_menu.ckn_bf +'</td>'+
                        '<td>'+ food_menu.product_price +'</td>'+
                        '<td>' +
                    '<span class="btn btn-xs btn-danger delete-product">Delete</span>   ' +
                    '<button type="button" class="btn btn-xs btn-primary edit-product" data-toggle="modal" data-target="#productModal1">Edit</button>' +
                '</td>' +
            '</tr>';

                });
                $("table").find('tbody').empty().html(table);
            }
         });
    });


    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            Burger: null,
            ckn_bf: null,
            product_price: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.Burger= element.value;
                    break;
                case 'uoms':
                    requestPayload.ckn_bf = element.value;
                    break;
                case 'price':
                    requestPayload.product_price  = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });
    $("#saveProduct1").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm1").serializeArray();
        var requestPayload = {
            Burger: null,
            ckn_bf: null,
            product_price: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.Burger= element.value;
                    break;
                case 'uoms':
                    requestPayload.ckn_bf = element.value;
                    break;
                case 'price':
                    requestPayload.product_price  = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });
    

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.ckn_bf_id +'">'+ uom.chicken_veg +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });
    $(document).on("click", ".edit-product", function () {
        // Get the row data from the table
        var tr = $(this).closest('tr');
        var productId = tr.data('id');
        var productName = tr.data('name');
        var productUom = tr.data('unit');
        var productPrice = tr.data('price');
    
        // Populate the form fields in productModal1
        $("#productModal1 #id").val(productId);
        $("#productModal1 #name").val(productName);
        $("#productModal1 #uoms").val(productUom);
        $("#productModal1 #price").val(productPrice);
    
        // Change the modal title to "Edit Product"
        $("#productModal1").find('.modal-title').text('Edit Product');
    
        // Show the modal
        $("#productModal1").modal('show');
    });