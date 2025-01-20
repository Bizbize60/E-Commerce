from sanic import Sanic
from sanic.response import json
from sanic_ext import Extend
import jwt
import datetime
from functools import wraps
import uuid

app = Sanic("CategoryAPI")
Extend(app)

# Token doğrulama fonksiyonu
def login_required(f):
    @wraps(f)
    async def decorated_function(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return json({"isSuccess": False, "message": "Lütfen giriş yapın."}, status=401)

        token = auth_header.split(" ")[1]
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.ctx.user = decoded  # Kullanıcı bilgisini talebe ekle
        except jwt.ExpiredSignatureError:
            return json({"isSuccess": False, "message": "Token süresi dolmuş."}, status=401)
        except jwt.InvalidTokenError:
            return json({"isSuccess": False, "message": "Geçersiz token."}, status=401)

        return await f(request, *args, **kwargs)
    return decorated_function
SECRET_KEY = "your_secret_key"
# Örnek kullanıcı veritabanı
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

# Sepetler
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

    customer_id = str(uuid.uuid4())  # Benzersiz bir ID oluşturuluyor

    token = jwt.encode(
        {"email": email, "customerId": customer_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    users_db.append({"email": email, "password": password, "customer_id": customer_id})
    return json({"isSuccess": True, "message": "Kayıt başarılı!", "token": token})


@app.post("/api/Users/Login")
async def login_user(request):
    email = request.json.get("email")
    password = request.json.get("password")

    user = next((user for user in users_db if user["email"] == email and user["password"] == password), None)

    if not user:
        return json({"isSuccess": False, "message": "Geçersiz e-posta veya şifre."}, status=401)

    token = jwt.encode(
        {"email": email, "customerId": user["customer_id"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return json({"isSuccess": True, "token": token, "customerId": user["customer_id"]})


    
# Kategoriler Endpointleri
@app.get("/api/Categories")
async def get_categories(request):
    return json({"isSuccess": True, "value": categories})

# Ürünler Endpointleri
@app.get("/api/Products")
async def get_products(request):
    category_id = request.args.get("categoryId")

    if category_id:
        category_id = int(category_id)
        filtered_products = [p for p in products if p["categoryId"] == category_id]
        return json({"isSuccess": True, "value": filtered_products})

    return json({"isSuccess": True, "value": products})

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
            return json({"isSuccess": True, "message": "Ürün güncellendi", "cartItems": cart_db[customer_id]})

    cart_db[customer_id].append({"productId": product_id, "quantity": quantity})
    print("Güncel Sepet:", cart_db)
    return json({"isSuccess": True, "message": "Ürün sepete eklendi", "cartItems": cart_db[customer_id]})





@app.get("/api/Carts/GetCartOfCustomer")
async def get_cart_of_customer(request):
    customer_id = request.args.get("customerId")

    if not customer_id:
        return json({"isSuccess": False, "message": "Müşteri ID eksik"}, status=400)

    if customer_id not in cart_db:
        cart_db[customer_id] = []

    # Ürün bilgilerini ekleyerek sepeti zenginleştir
    enriched_cart = [
        {
            "productId": item["productId"],
            "quantity": item["quantity"],
            "product": next((p for p in products if p["id"] == item["productId"]), None)
        }
        for item in cart_db[customer_id]
    ]

    return json({"isSuccess": True, "cartItems": enriched_cart})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5021, debug=True)
