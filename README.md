<h1 align="center">
 Foodfy
<img alt="Chef" title="#Chef" src="./public/screenshots/chef.png" height="100"/>
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
<p align="center">
<a href="#sobre-o-foodfy">Sobre o Foodfy</a> • 
<a href="#funcionalidades">Funcionalidades</a> • 
<a href="#tecnologias-e-ferramentas">Tecnologias e Ferramentas</a> • 
<a href="#instalação-e-uso">Instalação e uso</a> • 
<a href="#licença">Licença</a>

</p>

<br>

## Sobre o Foodfy


O Foodfy é uma aplicação web completa de gerenciamento de receitas, desenvolvida durante o bootcamp [LaunchBase](https://rocketseat.com.br/launchbase) da [Rocketseat](https://rocketseat.com.br/).

<h3 align="center">Main</h3>
<p align="center">
  <img src=".github/main.gif" alt="página principal">
</p>

<br>

<h3 align="center">Admin</h3>
<p align="center">
  <img src=".github/admin.gif" alt="página admin">
</p>

<br>

<h3 align="center">Email de boas-vindas</h3>
<p align="center">
  <img src=".github/welcome_email.png" alt="página admin">
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
- [Nodemailer](https://nodemailer.com/about/)
- [Express](https://expressjs.com/)
- [Express Session](https://github.com/expressjs/session)
- [Multer](https://github.com/expressjs/multer)
- [PostgreSQL](https://www.postgresql.org/)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [Faker.js](https://github.com/Marak/Faker.js)

<br>

## Instalação e Uso

Para rodar a aplicação, você precisa instalar o [Node](https://nodejs.org/en/) e o banco de dados [Postgres](https://www.postgresql.org/).

Siga os passos abaixo:

```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/AndreTorquato/foodfy.git
# ou use a opção de download.

# Entre na pasta com 
$ cd foodfy

# Instale as dependências
$ npm install

# Crie o banco de dados e as tabelas utilizando os comandos
# inclusos no arquivo "dbFoodfy.sql".
    
# Conexão com o banco de dados:
# Abra e edite o arquivo "db.js" dentro da pasta "src/config"
# com o seu user e password do Postgres.

# Popule o banco de dados usando o aquivo "seed.js":
$ node seed.js

# Rode a aplicação
$ npm start
```

**Importante:** Não exclua ou altere as imagens de placeholder diretamente da pasta `public/images`, pois as receitas e chefs gerados pelo `seed.js` compartilham desses arquivos entre si. Porém, é seguro deletá-las pela área administrativa do site.

<br>

### Acessando a Área Administrativa

Selecione um email da tabela users, acesse a tela de login e entre utilizando o mesmo com a senha "admin" (senha padrão).

Dica: usuários administradores possuem a badge "ADMIN" no header:
<p align="center">
  <img src=".github/admin_badge.png" alt="página admin">
</p>

<br>

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

By [André Torquato](https://github.com/AndreTorquato)

[![Linkedin Badge](https://img.shields.io/badge/-Andre%20Torquato-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/andretorquatoo/)](https://www.linkedin.com/in/andretorquatoo/) 
