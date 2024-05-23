import os
from flask import Flask, render_template, jsonify, request, redirect
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "usuário" #ALTERAR O NOME DE USUÁRIO DO MYSQL
app.config['MYSQL_PASSWORD'] = "senha" #ALTERAR PARA A SUA SENHA DO MYSQL
app.config['MYSQL_DB'] = "dadosestufa"

mysql = MySQL (app)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/index.html")
def index():
    return render_template('index.html')

@app.route("/graficos.html")
def graficos():
    cursor = mysql.connection.cursor()
    query = "SELECT Dia_Mes_Ano, Hora FROM dados ORDER BY dado_cod DESC LIMIT 1;"
    cursor.execute(query)
    resultado = cursor.fetchone()
    print("Resultado da consulta:", resultado)
    ultima_data = resultado[0]
    ultima_hora = resultado[1]
    cursor.close()
    return render_template("graficos.html",ultima_data=ultima_data, ultima_hora=ultima_hora )
    
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

@app.route("/api/medias", methods=["GET"])
def get_medias():
    if mysql.connection:
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT MAX(Dia_Mes_Ano) FROM dados")
            ultima_data = cursor.fetchone()[0]
            cursor.execute("SELECT AVG(Temperatura), AVG(UmidadeSolo), AVG(UmidadeAmbiente), AVG(VolumeAgua) FROM dados WHERE Dia_Mes_Ano = %s", (ultima_data,))
            medias = cursor.fetchone()
            return jsonify({
                'TemperaturaMedia': medias[0],
                'UmidadeSoloMedia': medias[1],
                'UmidadeAmbienteMedia': medias[2],
                'VolumeAguaMedia': medias[3],
            })
        finally:
            cursor.close()
    else:
        return jsonify({'error': 'Erro ao tentar estabelecer conexão com o Banco de Dados'}), 500

if __name__ == "__main__":
    app.run(debug=True) 


