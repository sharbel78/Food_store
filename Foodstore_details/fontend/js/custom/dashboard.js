$(function () {
  
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.Price);
                table += '<tr>' +
                    '<td>'+ order.Date +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.Phone_number +'</td>'+
                    '<td>'+ order.Price.toFixed(2) +' Rs <a href="manage-product.html" class="btn btn-sm btn-primary pull-right">View </a></td>';+ '</tr>'
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});