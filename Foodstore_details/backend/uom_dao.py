def get_uoms(connection):
 cursor = connection.cursor()
 query = ("SELECT* from uom")
 cursor.execute(query)

 response= []
 for (ckn_bf_id,chicken_veg) in cursor:
    response.append({
      "ckn_bf_id":ckn_bf_id,
      "chicken_veg":chicken_veg
    })
 return response
if __name__=='__main__':
 from sql_connection import sqlconnection

 connection = sqlconnection()
 print(get_uoms(connection))