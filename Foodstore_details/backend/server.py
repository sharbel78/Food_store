import json
from  flask import Flask,request,jsonify
from flask_cors import CORS
import uom_dao
import Food_dao
import order_dao
from sql_connection import sqlconnection

app = Flask(__name__)
CORS(app)

connection = sqlconnection()

@app.route('/getfooditem',methods=['GET'])
def getfooditem():
    products = Food_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/getUOM',methods=['GET'])
def get_uom():
    response= uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/deletefooditem',methods=['POST'])
def delete_product():
    return_id = Food_dao.delete_fooditem(connection,request.form['product_id'])
    response=jsonify({
        'product_id':return_id

    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/insertOrder',methods=['POST'])
def insert_order():
    request_payload=json.loads(request.form['data'])
    order_id = order_dao.insert_order(connection, request_payload)
    response= jsonify({
        'order_id':order_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/editfooditem',methods=['POST'])
def edit_product():
    request_payload=json.loads(request.form['product_id'])
    return_id = Food_dao.edit_fooditem(connection, request_payload)
    response=jsonify({
        'product_id':return_id

    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/getAllOrder',methods=['GET'])
def get_all_order():
    response= order_dao.get_all_order(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/insertProduct',methods=['POST'])
def insert_product():
    request_payload=json.loads(request.form['data'])
    product_id = Food_dao.insert_new_fooditem(connection, request_payload)
    response= jsonify({
        'product_id':product_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

if __name__ =="__main__":
    print("starting ")
    app.run(port=5000)