from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/index.html")
def index():
    return render_template('index.html')

@app.route("/graficos.html")
def graficos():
    return render_template("graficos.html")

app.run(debug=True)