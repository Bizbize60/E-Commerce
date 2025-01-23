import os
import mysql.connector
import base64
import bcrypt
def get_products_from_db():
    mydb = mysql.connector.connect(
        host="localhost", #BATUNUN İP ADRESİ
        user="root", #BURAK SANA BİR ÜYELİK OLUŞTURAMSI LAZIM BATU BANA OLUŞTURDUĞU GİBİ
        password="silatuna60",#BATUNUN SANA OLUŞTURDIĞI ŞİFRE
        database="web"   #CARRENT
        )
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("Select id, name, price, categoryId, imageUrl from products")
    products = mycursor.fetchall()
    for product in products:
        if product["imageUrl"]:
            product["imageUrl"] = base64.b64encode(product["imageUrl"]).decode('utf-8')

    # Bağlantıyı kapat
    mycursor.close()
    mydb.close()
    return product

print(get_products_from_db())
