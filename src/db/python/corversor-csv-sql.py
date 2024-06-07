import csv
from pathlib import Path

# Obter o diretório atual
diretorio_atual = Path(__file__).parent

# Gerar o caminho completo do arquivo CSV
arquivo_csv = str(diretorio_atual)[:-6] + "dados/dadosSensores_grafico.csv"
dados = []

with open(arquivo_csv, 'r+', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    dados_existentes = [linha for linha in reader]
    
    if dados_existentes[0] != ['DIA DA SEMANA', 'DATA', 'HORA', 'UMIDADE DO SOLO', 'UMIDADE DO AMBIENTE', 'TEMPERATURA', 'VOLUME DE ÁGUA EM L']:
        csvfile.seek(0)
        writer = csv.writer(csvfile)
        writer.writerow(['DIA DA SEMANA', 'DATA', 'HORA', 'UMIDADE DO SOLO', 'UMIDADE DO AMBIENTE', 'TEMPERATURA', 'VOLUME DE ÁGUA EM L'])
        writer.writerows(dados_existentes)

# Transformar tudo em uma só biblioteca
with open(arquivo_csv, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for linha in reader:
        dados.append(linha)

# Processar os valores
valores = str(dados_existentes[1:]).replace('{', "(").replace("}", ")").replace("[", "(").replace("]", ")").replace("TerÃ§a", "Terca").replace("SÃ¡bado", "Sabado").replace("TerÃƒÂ§a", "Terca").replace("SÃƒÂ¡bado", "Sabado").replace("(),", "").replace("())", "").replace("  ", " ")

# Conversão de vírgulas em pontos para números de ponto flutuante
x = 0
y = 0
while x < 10:
    valores = valores.replace(f'{x},{y}', f'{x}.{y}')
    y = y + 1
    if y == 10:
        y = 0
        x = x + 1

# Adicionar zero inicial nas datas
for k in range(1, 10):
    for j in range(1, 10):
        valores = valores.replace(f"'{k}/{j}/20", f"'0{k}/0{j}/20")
    for j in range(10, 13):
        valores = valores.replace(f"'{k}/{j}/20", f"'0{k}/{j}/20")
for k in range(10, 32):
    for j in range(1, 10):
        valores = valores.replace(f"'{k}/{j}/20", f"'{k}/0{j}/20")

# Corrigir a formatação de valores para garantir que todos estejam entre parênteses
valores = valores[2:-2]  # Remove os colchetes externos da lista
valores_lista = valores.split("), (")
valores_lista = [f"({v})" for v in valores_lista]
valores = ", ".join(valores_lista)

# Gerar arquivo SQL
import os
import sys

arquivo_nome = "bdAPI.sql"
diretorio_saida = os.path.join(os.path.expanduser("~"), str(diretorio_atual)[:-6] + "sql")
arquivo_completo = os.path.join(diretorio_saida, arquivo_nome)

conteudo_sql = f"""
create database DadosEstufa;
use DadosEstufa;
create table dados
( dado_cod int primary key auto_increment,
DiaSemana varchar(50),
Dia_Mes_Ano varchar(50),
Hora varchar(50),
UmidadeSolo varchar(50),
UmidadeAmbiente varchar(50),
Temperatura varchar(50),
VolumeAgua varchar(50));

insert into dados (DiaSemana, Dia_Mes_Ano, Hora, UmidadeSolo, UmidadeAmbiente, Temperatura, VolumeAgua) values {valores};
ALTER TABLE dados MODIFY UmidadeSolo Float;
ALTER TABLE dados MODIFY UmidadeAmbiente Float;
ALTER TABLE dados MODIFY Temperatura Float;
ALTER TABLE dados MODIFY VolumeAgua Float;
"""

try:
    with open(arquivo_completo, "w", encoding='utf-8') as arquivo:
        arquivo.write(conteudo_sql)
except Exception as e:
    print(f"Erro ao criar arquivo: {e}")
    sys.exit(1)

print(f"Arquivo SQL criado com sucesso: {arquivo_completo}")
