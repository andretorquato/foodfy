<h1 align="center">
Foodfy
</h1>

<p align="center">Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-CONCLUÍDO-FD951F?style=flat-square">
    <a href="https://github.com/AndreTorquato/foodfy/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/AndreTorquato/foodfy?color=FD951F&style=flat-square">
  </a>
    
  <img src="https://img.shields.io/badge/made%20by-ANDRE%20TORQUATO-FD951F?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/andretorquato/foodfy?color=FD951F&style=flat-square">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-FD951F?style=flat-square">
  </a>
</p>

## Tópicos 
<h3 align="center">
:pushpin:<a href="#sobre-o-foodfy">Sobre o Foodfy</a>
:sparkles:<a href="#funcionalidades">Funcionalidades</a> 
:hammer:<a href="#tecnologias-e-ferramentas">Tecnologias e Ferramentas</a>
:runner: <a href="#instalação-e-uso">Instalação e uso</a>
:page_facing_up:<a href="#licença">Licença</a>

</h3>

<br>

---

## Sobre o Foodfy


O Foodfy é uma aplicação web completa de gerenciamento de receitas, desenvolvida durante o bootcamp [LaunchBase](https://rocketseat.com.br) da [Rocketseat](https://rocketseat.com.br/).
<p align="center">
<img alt="Chef" title="#Chef" src="./public/screenshots/chef.png" height="100"/>
</p>

<h3 align="center">Home</h3>
<p align="center">
  <img src="./public/screenshots/home.jpg" alt="página principal">
</p>

<br>

<h3 align="center">Login</h3>
<p align="center">
  <img src="./public/screenshots/login.jpg" alt="página admin">
</p>
<br>
<h3 align="center">Demo</h3>
<p align="center">
  <img src="./public/screenshots/example.gif" alt="página admin">
</p>
<br>

## Funcionalidades

- [X] Explore variados tipos de receitas.
- [X] Gerenciar receitas, chefs e usuários.
- [X] Upload de imagems com Multer.
- [X] Pesquisar receitas.
- [X] Páginas dinâmicas com Nunjucks.
- [X] Banco de dados PostgreSQL.
- [X] Sistema de login e recuperação de senha.
- [X] Área administrativa.

<br>

## Tecnologias e Ferramentas
As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

- [HTML](https://devdocs.io/html/)
- [CSS](https://devdocs.io/css/)
- [JavaScript](https://devdocs.io/javascript/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Express Session](https://github.com/expressjs/session)
- [Faker.js](https://github.com/Marak/Faker.js)
- [Multer](https://github.com/expressjs/multer)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)


<br>

## Instalação e Uso

Para rodar a aplicação, você precisa instalar o [Node](https://nodejs.org/en/) e o banco de dados [PostgreSQL](https://www.postgresql.org/).

Siga os passos abaixo:

```bash
# No seu terminal cole este código:
$ git clone https://github.com/AndreTorquato/foodfy.git
# ou use a opção de download.

# para acessar a pasta:
$ cd foodfy

# Instale as dependências
$ npm install

# Crie o banco de dados e as tabelas utilizando os comandos
# inclusos no arquivo "dbFoodfy.sql".
    
# Conexão com o banco de dados:
# Abra e edite o arquivo "db.js" dentro da pasta "src/config"
# com o seu user e password do Postgres.

# crie uma conta no site https://mailtrap.io
# após cadastrar  SMTP Settings > integrations > Selecione Nodemailer
# copie as credencias
# adicione no projeto: src > libs > mailer.js


# Popule o banco de dados usando o aquivo "seed.js":
$ node seed.js

# Inicialize a aplicação :)
$ npm start
```
<br>

---
**IMPORTANTE:** 

se ocorrer algum erro devido as imagens no projeto a uma pasta chamada `public/backup_images`, copie todas as imagens e cole dentro da `public/images`.
<br>
**ESSA APLICAÇÃO FOI FEITA NO WINDOWS SE HOUVER ALGUM ERRO PARA CARREGAR AS IMAGES PODE SER QUE SEJA POR MOTIVOS DAS `"/"`**

---

### Acessando a Área Administrativa

Selecione um email da tabela **users** gerada pelo `seeds.js`, acesse a tela de login e entre utilizando o mesmo com a senha **"admin"** (senha padrão).

---
### Criando Novos Usuários e Recuperação de Senha

Para usar estes recursos, edite o arquivo `mailer.js` dentro da pasta `scr/lib` com suas credenciais.

<br>

## Licença
<a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-FD951F?style=flat-square">
</a>

<br>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.

---
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/44441254?s=460&u=9b932a2ecaa511f678b3e0cb118c9b536e6e166e&v=4" width="100px;" alt=""/>
 <br />
 <sub>By :zap: <b>André Torquato</b></sub> 

<br>
<br>

[![Linkedin Badge](https://img.shields.io/badge/-Andre%20Torquato-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/andretorquatoo/)](https://www.linkedin.com/in/andretorquatoo/) 
