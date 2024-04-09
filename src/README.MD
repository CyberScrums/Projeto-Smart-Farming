# Como rodar
> _Os códigos e processos presentes neste readme possuem versão para WINDOWS_
## O que será necessário

Para o funcionamento do nosso sistema, você precisara das seguintes tecnologias:

1. [Git](https://git-scm.com/downloads): Utilizaremos o Git para clonar o nosso repositório.

2. [Python](https://www.python.org/downloads/): Precisaremos do python, para isso, recomendamos que você instale a versão 3.11, não se esqueça de na hora da instalação, marcar a opção da instalação do pip, pois precisaremos dele para a criação e configuração do ambiente virtual.

3. [MySQL](https://dev.mysql.com/downloads/): Precisaremos também do MySQL para obter a funcionalidade de estatísticas das opções mais utilizadas no filtro.

## 1º Passo: Clonando o repositório

<details>
  <summary><b>Clique aqui</b></summary>

  Para clonar o projeto e utilizá-lo em seu computador, siga os seguintes passos:
  
  1. Crie uma pasta onde deseja armazenar nosso projeto, e então abra-a e clique na url da pasta, ou então utilize o atalho `Ctrl+L` para selecionar a url, como demonstrado no exemplo abaixo 👇<br> <img src="https://cdn.discordapp.com/attachments/1217604924402303037/1227225379429810258/imagem_2024-04-09_085515681.png?ex=6627a1b3&is=66152cb3&hm=28b47e4a797002509bbf01d3ee8777bf3f4ce11a03a77eeadab62122c38f1b24&">
  
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

  1. Estando com o `CMD` aberto, execute os seguintes comandos:

  ```
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  ```

  > _Caso você esteja em LINUX, digite os comandos desta maneira:_<br>
  `python3 -m venv venv`<br>
  `source venv/bin/activate`<br>
  `pip install -r requirements.txt`

</details>
<br>


## 3º Passo: Abrindo a aplicação web

<details>
  <summary><b>Clique aqui</b></summary>

  1. Ainda dentro do ambiente virtual, execute o seguinte comando:
  ```
  flask run
  ```

  2. Por fim, entre no link que aparecerá no cmd copiando e colando ele no seu navegador de preferência, ou então simplesmente clique aqui: <a href="http://127.0.0.1:5000">http://127.0.0.1:5000</a>

  3. Após finalizar o uso do nosso site, para sair do ambiente virtual, no cmd, execute o atalho `Ctrl+C` para finalizar o serviço do Flask, e então execute o seguinte comando:
  ```
  deactivate
  ```

</details>

→ [Voltar ao topo](#topo)
