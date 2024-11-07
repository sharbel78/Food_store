import mysql.connector

cll = None

def sqlconnection():
    global cll
    if cll is None:
         cll = mysql.connector.connect(user='root', password='1234',
                              host='127.0.0.1',
                              database='foodmenu')
    return cll