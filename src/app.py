from flask import Flask, render_template, jsonify, request
import mysql.connector

app = Flask(__name__)

db_config = {
    'user': 'USUARIO', #ALTERAR PARA SEU USUÁRIO NO MYSQL
    'password': 'SENHA', #ALTERAR PARA A SUA SENHA NO MYSQL
    'host': 'db', 
}

conn = mysql.connector.connect(**db_config)

@app.route("/")
def home():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("use DadosEstufa;")
        query = "SELECT Dia_Mes_Ano, Hora FROM dados ORDER BY dado_cod DESC LIMIT 1;"
        cursor.execute(query)
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if resultado:
            ultima_data = resultado[0]
            ultima_hora = resultado[1]
        else:
            ultima_data = None
            ultima_hora = None
        return render_template("index.html", ultima_data=ultima_data, ultima_hora=ultima_hora)
    except mysql.connector.Error as err:
        return f"Erro: {err}", 500

@app.route("/api/dados", methods=["GET"])
def get_dados():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("use DadosEstufa;")
        cursor.execute("SELECT DiaSemana, Dia_Mes_Ano, Hora, Temperatura, UmidadeSolo, UmidadeAmbiente, VolumeAgua FROM dados")
        resultados = cursor.fetchall()
        cursor.close()
        conn.close()

        dados = [{
            'DiaSemana': row[0],
            'Data': row[1],  
            'Hora': row[2],
            'Temperatura': row[3],
            'UmidadeSolo': row[4],
            'UmidadeAmbiente': row[5],
            'VolumeAgua': row[6],
        } for row in resultados]
        return jsonify(dados)
    except mysql.connector.Error as err:
        return jsonify({'error': f"Erro: {err}"}), 500


@app.route("/api/dadosdata", methods=["GET"])
def get_dadosdata():
    data = request.args.get('data')
    if not data:
        return jsonify({'error': 'Data não fornecida'}), 400
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("use DadosEstufa;")
        cursor.execute("SELECT DiaSemana, Dia_Mes_Ano, Hora, Temperatura, UmidadeSolo, UmidadeAmbiente, VolumeAgua FROM dados WHERE Dia_Mes_Ano = %s", (data,))
        resultados = cursor.fetchall()
        cursor.close()
        conn.close()

        if not resultados:
            return jsonify({'error': 'Dados para os gráficos não encontrados'}), 404

        dados = [{
            'DiaSemana': row[0],
            'Data': row[1],
            'Hora': row[2],
            'Temperatura': row[3],
            'UmidadeSolo': row[4],
            'UmidadeAmbiente': row[5],
            'VolumeAgua': row[6],
        } for row in resultados]
        return jsonify(dados)
    except mysql.connector.Error as err:
        return jsonify({'error': f"Erro: {err}"}), 500


@app.route("/api/medias", methods=["GET"])
def get_medias():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("use DadosEstufa;")
        cursor.execute("SELECT MAX(Dia_Mes_Ano) FROM dados")
        ultima_data = cursor.fetchone()[0]
        cursor.execute("SELECT AVG(Temperatura), AVG(UmidadeSolo), AVG(UmidadeAmbiente), AVG(VolumeAgua) FROM dados WHERE Dia_Mes_Ano = %s", (ultima_data,))
        medias = cursor.fetchone()
        cursor.close()
        conn.close()

        return jsonify({
            'TemperaturaMedia': medias[0],
            'UmidadeSoloMedia': medias[1],
            'UmidadeAmbienteMedia': medias[2],
            'VolumeAguaMedia': medias[3],
        })
    except mysql.connector.Error as err:
        return jsonify({'error': f"Erro: {err}"}), 500

@app.route("/api/mediasdata", methods=["GET"])
def get_mediasdata():
    data = request.args.get('data')
    if not data:
        return jsonify({'error': 'Data não fornecida'}), 400
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("use DadosEstufa;")
        cursor.execute("SELECT AVG(Temperatura), AVG(UmidadeSolo), AVG(UmidadeAmbiente), AVG(VolumeAgua) FROM dados WHERE Dia_Mes_Ano = %s", (data,))
        medias = cursor.fetchone()
        cursor.close()
        conn.close()

        if not medias or all(m is None for m in medias):
            return jsonify({'error': 'Dados para média não encontrados'}), 404
        return jsonify({
            'TemperaturaMedia': medias[0],
            'UmidadeSoloMedia': medias[1],
            'UmidadeAmbienteMedia': medias[2],
            'VolumeAguaMedia': medias[3],
        })
    except mysql.connector.Error as err:
        return jsonify({'error': f"Erro: {err}"}), 500
    
    
app.logger.debug("Mensagem de depuração aqui")


if __name__ == "__main__":
    app.run(debug=True)