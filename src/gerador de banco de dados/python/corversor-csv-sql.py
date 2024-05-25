import csv
from pathlib import Path

# Obter o diretório atual
diretorio_atual = Path(__file__).parent

# Gerar o caminho completo do arquivo CSV
arquivo_csv = str(diretorio_atual)[:-6] + "dados/dadosSensores_grafico.csv"
dados = [] 

with open(arquivo_csv, 'r+') as csvfile:
    # Cria um objeto `reader` para ler as linhas existentes
    reader = csv.reader(csvfile)

    # Lê todas as linhas existentes e armazena em uma lista
    dados_existentes = [linha for linha in reader]
    if dados_existentes[0]!=['DIA DA SEMANA', 'DATA', 'HORA', 'UMIDADE DO SOLO','UMIDADE DO AMBIENTE','TEMPERATURA','VOLUME DE ÁGUA EM L']:
        # Reposiciona o cursor no início do arquivo
        csvfile.seek(0)

    # Cria um objeto `writer` para escrever o cabeçalho
        writer = csv.writer(csvfile)

   # Escreve o cabeçalho (lista de nomes de colunas)
        writer.writerow(['DIA DA SEMANA', 'DATA', 'HORA', 'UMIDADE DO SOLO','UMIDADE DO AMBIENTE','TEMPERATURA','VOLUME DE ÁGUA EM L'])

    # Escreve as linhas existentes de volta para o arquivo
        writer.writerows(dados_existentes)

    

with open(arquivo_csv, 'r') as csvfile:  #transforma tudo em uma só biblioteca
    reader = csv.DictReader(csvfile) 
    for linha in reader: 
        dados.append(linha)
valores = str(dados_existentes[1:]).replace('{',"(").replace("}",")").replace("[","(").replace("]",")").replace("TerÃ§a","Terça").replace("SÃ¡bado","Sábado").replace("TerÃƒÂ§a","Terça").replace("(),","").replace("())","").replace("SÃƒÂ¡bado","Sábado")
#removedor de , para . do float

#remove , e transforma em .
x = 0
y = 0
while x < 10:
    valores = valores.replace(f'{x},{y}',f'{x}.{y}')
    y = y+1
    if y == 10:
     y = 0
     x = x+1
#print(len(dados))
#filtra data
for k in range(10):
    for j in range(13):
        valores = valores.replace(f"'{k}/{j}/2023",f"'0{k}/{j}/2023")
#geração de sql
import os
import sys

arquivo_nome = "bdAPI.sql"
diretorio_saida = os.path.join(os.path.expanduser("~"), str(diretorio_atual)[:-6]+"sql")
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

insert into dados (DiaSemana, Dia_Mes_Ano, Hora, UmidadeSolo, UmidadeAmbiente, Temperatura, VolumeAgua) values ({valores[0:-1]});
ALTER TABLE dados MODIFY UmidadeSolo Float;
ALTER TABLE dados MODIFY UmidadeAmbiente Float;
ALTER TABLE dados MODIFY Temperatura Float;
ALTER TABLE dados MODIFY VolumeAgua Float;


"""

try:
    with open(arquivo_completo, "w") as arquivo:
        arquivo.write(conteudo_sql)
except Exception as e:
    print(f"Erro ao criar arquivo: {e}")
    sys.exit(1)

print(f"Arquivo SQL criado com sucesso: {arquivo_completo}")




