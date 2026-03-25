from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/submit_order', methods=['POST'])
def submit_order():
    data = request.json
    try:
        with open("orders.txt", "a", encoding="utf-8") as f:
            f.write(f"الاسم: {data['name']} | الهاتف: {data['phone']} | العنوان: {data['address']}\n")
            f.write(f"الطلبات: {data['items']}\n")
            f.write("-" * 30 + "\n")
        return jsonify({"status": "success"})
    except:
        return jsonify({"status": "error"})

if __name__ == '__main__':
    app.run(debug=True)