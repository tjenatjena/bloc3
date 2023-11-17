from flask import Flask, jsonify, request, session, make_response
from flask_cors import CORS
from datetime import datetime
import uuid

def generate_unique_id():
    return str(uuid.uuid4())

users = [{"username": "admin", "password": "admin", "is_admin": True}]

products = [
    {
        "id": generate_unique_id(),
        "name": "Product 1",
        "price": 10.0,
        "category": "Category A",
        "promo_percentage": 0,
        "start_date": None,
        "end_date": None
    },
    {
        "id": generate_unique_id(),
        "name": "Product 2",
        "price": 15.0,
        "category": "Category B",
        "promo_percentage": 0,
        "start_date": None,
        "end_date": None
    },
    {
        "id": generate_unique_id(),
        "name": "Product 3",
        "price": 20.0,
        "category": "Category C",
        "promo_percentage": 10,
        "start_date": "2023-11-01T00:00:00",
        "end_date": "2023-11-30T23:59:59"
    }
]

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "123"

# Route pour l'authentification
@app.route('/api/login', methods=['POST'])
def login_route():
    data = request.get_json()

    for user in users:
        if user["username"] == data["username"] and user["password"] == data["password"]:
            session['user'] = data["username"]
            session['is_admin'] = user.get('is_admin', False)
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Route pour obtenir la liste des produits
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Route pour obtenir l'état de connexion de l'utilisateur
@app.route('/api/status', methods=['GET'])
def get_status():
    if 'user' in session:
        return jsonify({"message": f"Vous êtes connecté en tant que {session['user']}"})
    else:
        return jsonify({"message": "Vous n'êtes pas connecté"})

# Route pour se déconnecter
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Vous avez été déconnecté"}), 200

# Route pour les options CORS
@app.route('/api/products', methods=['OPTIONS'])
def options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    return response

if __name__ == '__main__':
    app.run(debug=True)
