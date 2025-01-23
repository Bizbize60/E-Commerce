# main.py
import base64
import mysql.connector
from sanic import Sanic
from sanic.response import json
from sanic_ext import Extend
from sanic_cors import CORS
import jwt
import datetime
from functools import wraps
import uuid
import bcrypt

app = Sanic("CategoryAPI")
CORS(app, resources={r"/*": {"origins": "*"}})
Extend(app)

SECRET_KEY = "your_secret_key"
def get_something_from_order(customer_id,which_data,isdict):
    mydb = mysql.connector.connect(
        host="localhost",      # MySQL sunucu adresi
        user="root",           # MySQL kullanıcı adı
        password="silatuna60", # MySQL şifresi
        database="web"         # Veritabanı adı
    )
    cursor = mydb.cursor(dictionary=isdict)

    # Kullanıcıyı sorgula
    query = f"SELECT {which_data} FROM orders WHERE customer_id = %s"
    cursor.execute(query, (customer_id,))
    cart = cursor.fetchall()  # Tek bir sonucu al

    # Bağlantıyı kapat
    cursor.close()
    mydb.close()
    return cart

def update_order_quantity(customer_id, product_id, quantity):
        # MySQL veritabanına bağlan
        mydb = mysql.connector.connect(
            host="localhost",          # MySQL sunucu adresi
            user="root",               # MySQL kullanıcı adı
            password="silatuna60",     # MySQL şifresi
            database="web"             # Veritabanı adı
        )
        cursor = mydb.cursor()

        # Miktarı güncelleme sorgusu
        query = """
            UPDATE orders
            SET quantity = quantity + %s
            WHERE customer_id = %s AND product_id = %s
        """
        values = (quantity, customer_id, product_id)
        
        cursor.execute(query, values)
        mydb.commit()  # Değişiklikleri kaydet
        cursor.close()
        mydb.close()

        # Eğer etkilenen satır yoksa, kayıt bulunamadı demektir
        
# Mock Database
def add_order(customer_id, product_id, quantity):
    
        # MySQL veritabanına bağlan
        mydb = mysql.connector.connect(
            host="localhost",          # MySQL sunucu adresi
            user="root",               # MySQL kullanıcı adı
            password="silatuna60",     # MySQL şifresi
            database="web"             # Veritabanı adı
        )
        cursor = mydb.cursor()

        # SQL sorgusu ile yeni sipariş ekle
        query = """
            INSERT INTO orders (customer_id, product_id, quantity)
            VALUES (%s, %s, %s)
        """
        values = (customer_id, product_id, quantity)
        
        cursor.execute(query, values)
        mydb.commit()  
        cursor.close()
        mydb.close()
        print("DATABASE ORDER'A EKLENDİ")


def get_user_from_db(email, password):
    # Veritabanına bağlan
    mydb = mysql.connector.connect(
        host="localhost",      # MySQL sunucu adresi
        user="root",           # MySQL kullanıcı adı
        password="silatuna60", # MySQL şifresi
        database="web"         # Veritabanı adı
    )
    cursor = mydb.cursor(dictionary=True)

    # Kullanıcıyı sorgula
    query = "SELECT * FROM customers WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()  # Tek bir sonucu al

    # Bağlantıyı kapat
    cursor.close()
    mydb.close()

    return user
def register_user_into_db(arr):
    mydb = mysql.connector.connect(
        host="localhost", #BATUNUN İP ADRESİ
        user="root", #BURAK SANA BİR ÜYELİK OLUŞTURAMSI LAZIM BATU BANA OLUŞTURDUĞU GİBİ
        password="silatuna60",#BATUNUN SANA OLUŞTURDIĞI ŞİFRE
        database="web"   #CARRENT
        )
    mycursor = mydb.cursor()
    sql="INSERT INTO customers Values (%s, %s, %s)"
    val=(arr[0]["customer_id"],arr[0]["email"],bcrypt.hashpw(arr[0]["password"].encode('utf-8'), bcrypt.gensalt()))
    mycursor.execute(sql,val)
    mydb.commit()
    mycursor.close()
    mydb.close()


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
    return products



users_db = []
categories = [
    {"id": 1, "name": "Meyve/Sebze"},
    {"id": 2, "name": "Et/Tavuk"},
    {"id": 3, "name": "Su"},
    {"id": 4, "name": "Süt Ürünleri"},
]

products = [
    {"id": 1, "name": "Elma", "price": 10, "categoryId": 1, "imageUrl": "https://www.kayalarziraat.com/wp-content/uploads/2022/12/roseglow-elma.png"},
    {"id": 2, "name": "Domates", "price": 20, "categoryId": 1, "imageUrl": "https://www.mertcantarim.com.tr/wp-content/uploads/2020/01/domates-salkim-736x414.jpg"},
    {"id": 3, "name": "Tavuk Göğsü", "price": 30, "categoryId": 2, "imageUrl": "https://cdn.cimri.io/market/260x260/gozde-1-kg-pilic-bonfile-_959362.jpg"},
    {"id": 4, "name": "Su (1 Litre)", "price": 50, "categoryId": 3, "imageUrl": "https://productimages.hepsiburada.net/s/386/375-375/110000405556267.jpg"},
    {"id": 5, "name": "Tam Yağlı Süt", "price": 40, "categoryId": 4, "imageUrl": "https://www.icim.com.tr/wp-content/uploads/2024/02/icim-15-yagli-uht-sut_vs3.png"},
]

cart_db = {}

# Middleware: CORS Ekleme
@app.middleware("response")
async def add_cors_headers(request, response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"

# Kullanıcı Yönetimi
@app.post("/api/Users/Register")
async def register_user(request):
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return json({"isSuccess": False, "message": "E-posta ve şifre gereklidir."}, status=400)

    if any(user["email"] == email for user in users_db):
        return json({"isSuccess": False, "message": "Bu e-posta zaten kayıtlı."}, status=400)

    customer_id = str(uuid.uuid4())

    token = jwt.encode(
        {"email": email, "customerId": customer_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    users_db.append({"email": email, "password": password, "customer_id": customer_id})
    register_user_into_db(users_db)
    return json({"isSuccess": True, "message": "Kayıt başarılı!", "token": token})

@app.post("/api/Users/Login")
async def login_user(request):
    email = request.json.get("email")
    password = request.json.get("password")

    user = get_user_from_db(email,password)
    if bcrypt.checkpw(password.encode('utf-8'),get_user_from_db(email,password)["password"].encode('utf-8')):

        token = jwt.encode(
            {"email": email, "customerId": user["customer_id"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )
        
        

        return json({"isSuccess": True, "token": token, "customerId": user["customer_id"]})
    else:
        return json({"isSuccess": False, "message": "Geçersiz e-posta veya şifre."}, status=401)

# Kategoriler Endpointleri
@app.get("/api/Categories")
async def get_categories(request):
    return json({"isSuccess": True, "value": categories})

# Ürünler Endpointleri
@app.get("/api/products")
async def get_products(request):
    # Veritabanından ürünleri çek
    products = get_products_from_db()
    
    # Kategoriye göre filtreleme
    category_id =  request.args.get("categoryId")
    if category_id:
        category_id = int(category_id)
        filtered_products = [p for p in products if p["categoryId"] == category_id]
        return json({"isSuccess": True, "value": filtered_products})
    
    # Tüm ürünleri döndür
    return json({"isSuccess": True, "value": products})

# Sepet İşlemleri
@app.post("/api/Carts/AddProduct")
async def add_to_cart(request):
    customer_id = request.json.get("customerId")
    product_id = request.json.get("productId")
    quantity = request.json.get("quantity", 1)

    if not customer_id or not product_id:
        return json({"isSuccess": False, "message": "Eksik parametreler"}, status=400)

    if customer_id not in cart_db:
        cart_db[customer_id] = []

    for item in cart_db[customer_id]:
        if item["productId"] == product_id:
            item["quantity"] += quantity
            update_order_quantity(customer_id,product_id,item["quantity"])
            return json({"isSuccess": True, "message": "Ürün güncellendi", "cartItems": cart_db[customer_id]})

    cart_db[customer_id].append({"productId": product_id, "quantity": quantity})
    add_order(customer_id,product_id,quantity)
   
    return json({"isSuccess": True, "message": "Ürün sepete eklendi", "cartItems": cart_db[customer_id]})

@app.get("/api/Carts/GetCartOfCustomer")
async def get_cart_of_customer(request):
    enriched_cart = []
    customer_id = request.args.get("customerId")
    products = get_products_from_db()
    cart_of_customer=get_something_from_order(customer_id,"product_id,quantity",True)
    if not customer_id:
        return json({"isSuccess": False, "message": "Müşteri ID eksik"}, status=400)

    if customer_id not in cart_db:
        cart_db[customer_id] = []
    for product in products:
        for item in cart_of_customer:
            if product["id"] == item["product_id"]:
                enriched_cart.append({
                        "productId": item["product_id"],
                        "quantity": item["quantity"],
                        "product": {
                            "id":product["id"],
                            "name":product["name"] ,
                            "price":product["price"] ,
                            "categoryId":product["categoryId"] ,
                            "imageUrl":product["imageUrl"] ,
                        }
                         })

    return json({"isSuccess": True, "cartItems": enriched_cart})

@app.delete("/api/Carts/RemoveProduct")
async def remove_from_cart(request):
    customer_id = request.json.get("customerId")
    product_id = request.json.get("productId")

    if not customer_id or not product_id:
        return json({"isSuccess": False, "message": "Eksik parametreler"}, status=400)

    if customer_id in cart_db:
        cart_db[customer_id] = [
            item for item in cart_db[customer_id] if item["productId"] != product_id
        ]
        return json({"isSuccess": True, "message": "Ürün sepetten kaldırıldı", "cartItems": cart_db[customer_id]})

    return json({"isSuccess": False, "message": "Müşteri bulunamadı"}, status=404)

# Diğer route'ların altında bir yere ekleyin
@app.options("/api/<path:path>")
async def preflight_handler(request, path):
    return json({}, headers={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type"
    })



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5021, debug=True)