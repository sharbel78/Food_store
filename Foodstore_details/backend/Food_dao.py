import json
from sql_connection import sqlconnection
import mysql.connector


def get_all_products(connection):
    cursor = connection.cursor()
    query = (
        "SELECT food_menu.Product_id, food_menu.Burger, food_menu.ckn_bf, food_menu.product_price, uom.chicken_veg "
        "FROM food_menu INNER JOIN uom ON food_menu.ckn_bf = uom.ckn_bf_id")

    cursor.execute(query)
    response = []
    for (Product_id, Burger, ckn_bf, product_price, chicken_veg) in cursor:
        response.append(
            {
                'product_id': Product_id,
                "Burger": Burger,
                "ckn_bf": ckn_bf,
                "product_price": product_price,
                "chicken_veg": chicken_veg
            }
        )

    return response

def insert_new_fooditem(connection,foodmenu):
    cursor=connection.cursor()
    query = ("INSERT INTO food_menu"
           "(Burger,ckn_bf,product_price)"
           "VALUES (%s,%s,%s)")
           
    data=(foodmenu['Burger'],foodmenu['ckn_bf'],foodmenu['product_price'])
    data = tuple(map(lambda x: json.dumps(x) if isinstance(x, list) else x, data))

        
    cursor.execute(query,data)
    connection.commit()

    return cursor.lastrowid
def delete_fooditem(connection,product_id):
    curses = connection.cursor()
    query=("DELETE FROM food_menu where product_id="+ str(product_id))
    
    curses.execute(query,)
    connection.commit()
def edit_fooditem(connection, foodmenu):
    curses = connection.cursor()
    
    
    query = (
        "UPDATE food_menu SET "
        "Burger = %s, ckn_bf = %s, product_price = %s "
        "WHERE product_id = %s"
    )
    
    curses.execute(query)
    connection.commit()


if __name__ == '__main__':
    connection = sqlconnection()
    print(delete_fooditem(connection,13))
