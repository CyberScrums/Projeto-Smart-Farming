# Como rodar
> _Os códigos e processos presentes neste readme possuem versão para WINDOWS_
## O que será necessário

Para o funcionamento do nosso sistema, você precisara das seguintes tecnologias:

1. [Git](https://git-scm.com/downloads): Utilizaremos o Git para clonar o nosso repositório.

2. [Python](https://www.python.org/downloads/): Precisaremos do python para podermos utilizar de maneira adequada o nosso ambiente virtual, incluímos ele no arquivo requirements, porém sinta-se a vontade caso queira ter uma garantia baixando o python por si só.

3. [Docker](https://docs.docker.com/get-docker/): Usaremos o Docker para rodar os containers que contém apenas as imagens que usaremos na aplicação, tornando o processo mais leve. Se seu SO for Windows baixe o Docker Desktop para que possa executar o programa, caso seja Linux ou macOS, você pode optar por baixa-lo no terminal ou baixar o Docker Desktop para estes respectivos Sistemas Operacionais.


## 1º Passo: Clonando o repositório

<details>
  <summary><b>Clique aqui</b></summary>

  Para clonar o projeto e utilizá-lo em seu computador, siga os seguintes passos:
  
  1. Crie uma pasta onde deseja armazenar nosso projeto, e então abra-a e clique na url da pasta, ou então utilize o atalho `Ctrl+L` para selecionar a url, e escreva 'cmd' para abrir o prompt de comando.
  
  > _Obs.: Caso você esteja no LINUX, a parte de escrever "cmd" não irá funcionar, então clique com o botão direito na pasta que você criou e selecione a opção "Abrir no terminal"_

  Um prompt de comando irá se abrir, e então execute o comando abaixo:
  
  ```
  git clone https://github.com/CyberScrums/Projeto-Smart-Farming.git
  ``` 

</details>
<br>

## 2º Passo: Iniciando o ambiente virtual

<details>
  <summary><b>Clique aqui</b></summary>

  1. Após a clonagem, clique com o botão direito na pasta e selecione a opção de abrir com o Terminal, e insira os seguintes comandos :

  ```
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt (lembre-se de dar primeiro "cd Projeto-Smart-Farm" e em seguida dar "cd src" para entrar na pasta e dar o comando)
  ```

  > _Caso você esteja em LINUX, digite os comandos desta maneira:_<br>
  `python3 -m venv venv`<br>
  `source venv/bin/activate`<br>
  `pip install -r requirements.txt` (lembre-se de dar "cd src" para entrar na pasta e dar o comando)

</details>
<br>

## 3º Passo: Configurando Banco de Dados

<details>
  <summary><b>Cliqui aqui</b></summary>


  1. Primeiramente, no seu MySQL Workbench selecione a opção de abrir o Script bdAPI.sql (localizado na pasta SQL dentro de "Gerador de Banco de Dados") e Execute para criar o Banco de Dados, selecionando uma figura de Trovão que é responsavel por rodar todo o script.
  2. Antes de inicializar a aplicação verifique se as credênciais de acesso, disponíveis dentro da pasta "src" no arquivo app.py, estão de acordo com as definições da sua instância MySQL.

  Caso opte por rodar em Docker
  ```
  'user': 'USUARIO', #ALTERAR PARA SEU USUÁRIO NO MYSQL
  'password': 'SENHA', #ALTERAR PARA A SUA SENHA NO MYSQL
  'host': 'db', 
  ```
  
  Caso opte por rodar em Flask
  ```
  'user': 'USUARIO', #ALTERAR PARA SEU USUÁRIO NO MYSQL
  'password': 'SENHA', #ALTERAR PARA A SUA SENHA NO MYSQL
  'host': 'localhost', 
  ```

  3. Caso algum problema ocorra durante a inicialização do flask, ou a seguinte dependência não sejam reconhecida "mysql-connector", instale da seguinte forma:
  
  ```
  python3 -m pip install mysql-connector-python==8.4.0
  ```
  
  </details>
  <br>

## 4º Passo: Abrindo a aplicação web

<details>
  <summary><b>Clique aqui</b></summary>

  1. Ainda dentro do ambiente virtual e dentro da pasta src, execute o seguinte comando:
  ```
  flask run
  ```

  2. Por fim, entre no link que aparecerá no cmd copiando e colando ele no seu navegador de preferência, ou então simplesmente clique aqui: <a href="http://127.0.0.1:5000">http://127.0.0.1:5000</a>

  3. Após finalizar o uso do nosso site, para sair do ambiente virtual, no terminal, execute o atalho `Ctrl+C` para finalizar o serviço do Flask, e então execute o seguinte comando:
  ```
  deactivate
  ```

</details>
<br>

## 5º Passo: Utilizando o Docker para abrir a aplicação

<details>
  <summary><b>Clique aqui</b></summary>
  
  > _Com o Docker é possível fazer sua aplicação rodar em qualquer máquina, sendo usado apenas o Dockerfile e o Docker-compose.yml, por isso está a opção mais recomendada para seu projeto._

  1. Acesse o terminal no diretório onde se encontra os arquivos Dockerfile e Docker-compose.yml (diretório SRC)

  2. Digite o comando para iniciar o container-docker
   ```
   docker-compose up --build
   ```
  
  3. Depois de um tempo dado para inicialização do conteiner, irá aparecer no terminal uma mensagem avisando que ele está rodando. Após isto, basta escrever na busca do seu navegador o seguinte comando
   ```
   localhost:5001/
   ```

  4. Após usar a aplicação basta fechar o container-docker executando o seguinte comando no terminal
   ```
   Ctrl + C
   ```

</details>
<br>

→ [Voltar ao topo](#topo)
