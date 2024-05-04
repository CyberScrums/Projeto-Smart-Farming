import os
from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("DB_HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DB_NAME")

mysql = MySQL (app)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/index.html")
def index():
    return render_template('index.html')

@app.route("/graficos.html")
def graficos():
     return render_template("graficos.html")
    
@app.route("/api/dados", methods=["GET"])
def get_dados():
    if mysql.connection:
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT DiaSemana, Dia_Mes_Ano, Hora, Temperatura, UmidadeSolo, UmidadeAmbiente, VolumeAgua FROM dados")
            resultados = cursor.fetchall()

            dados = [{
                'DiaSemana': row[0],
                'Data': row[1],  # Colunas do banco de dados
                'Hora': row[2],
                'Temperatura': row[3],
                'UmidadeSolo': row[4],
                'UmidadeAmbiente': row[5],
                'VolumeAgua': row[6],
            } for row in resultados]
            return jsonify(dados)  # Retorna dados como JSON
        finally:
            cursor.close()
    else:
        return jsonify({'error': 'Erro ao tentar estabelecer conexão com o Banco de Dados'}), 500


if __name__ == "__main__":
    app.run(debug=True) 


