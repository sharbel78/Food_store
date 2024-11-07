from datetime import datetime
from sql_connection import sqlconnection

def insert_order(connection, order):
    cursor = connection.cursor()

    order_query = ("INSERT INTO `order` "
                   "(Date, Phone_number, Price) "
                   "VALUES (%s, %s, %s)")

    order_data = (datetime.now(), order['Phone_number'], order['Price'])
    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid
    order_details_query=("INSERT INTO `order_details` "
                   "(order_id,product_id,food_name,quantity, phone_number, Total_Price) "
                   "VALUES (%s, %s, %s,%s,%s,%s)")
    order_details_data=[]
    for order_detail_record in order['order_details']:
        order_details_data.append([
            order_id,
            int(order_detail_record['product_id']),
            order_detail_record['food_name'],
            float(order_detail_record['quantity']),
            order['Phone_number'],
            float(order_detail_record['Total_Price']),



        ])
    cursor.executemany(order_details_query,order_details_data)
    connection.commit()
    return order_id
def get_order_details(connection, order_id):
    cursor = connection.cursor()

    query = "SELECT * from `order_details` where order_id = %s"

    query = "SELECT order_details.order_id, order_details.quantity, order_details.Total_Price, "\
            "food_menu.Burger, food_menu.product_price FROM order_details LEFT JOIN food_menu on " \
            "order_details.product_id = food_menu.Product_id where order_details.order_id = %s"

    data = (order_id, )

    cursor.execute(query, data)

    records = []
    for (order_id, quantity, Total_Price, phone_number, product_price) in cursor:
        records.append({
            'order_id': order_id,
            'quantity': quantity,
            'total_price': Total_Price,
            'product_name': phone_number,
            'price_per_unit': product_price,
        })

    cursor.close()

    return records

def get_all_order(connection):
    cursor = connection.cursor()
    query=("SELECT * from `order` ")
    cursor.execute(query)

    response= []
    for(order_id,Date,Phone_number,Price) in cursor:
        response.append({
            'order_id':order_id,
            'Date':Date,
            'Phone_number':Phone_number,
            'Price':Price,

        })
    cursor.close()

    for record in response:
        record['order_details']= get_order_details(connection, record['order_id'])


    return response

 
if __name__ == '__main__':
   
    connection = sqlconnection()
    print(get_all_order(connection))
    # print(insert_order(connection, {
    #     'Date': datetime.now(),
    #     'Phone_number': '8768968888',
    #     'Price': '780',
    #     'order_details': [
    #         {
    #             'product_id': 2,
    #             'food_name': 'cheeseburger',
    #             'quantity': 1,
    #             'phone_number': '8768968888',
    #             'Total_Price': 300
    #         },
    #         {
    #             'product_id': 4,
    #             'food_name': 'xxx burger',
    #             'quantity': 1,
    #             'phone_number': '8768968888',
    #             'Total_Price': 240
    #         },
    #     ]
    # }))
