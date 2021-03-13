const crypto = require("crypto");
const { hash } = require("bcryptjs");

const Users = require("../models/users");
const mailer = require("../../libs/mailer");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/users");
  },
  async index(req, res) {
    const userLogged = req.session.user;
    try {
      let users = await Users.allChefs();
      users = users.rows;
      return res.render("admin/users/index", { users, userLogged });
    } catch (error) {
      console.log(error);
    }
  },
  async profile(req, res) {
    const { id } = req.params;

    const notDisplayPassword = false;
    const user = await Users.findOne({ where: { id } });
    
    return res.render("admin/users/profile", { user, token: req.query.token });
  },
  async edit(req, res) {
    const { id } = req.params;
    const notDisplayPassword = true;
    const user = await Users.findOne({ where: { id } });
    return res.render("admin/users/edit", { user, notDisplayPassword });
  },
  create(req, res) {
    const notDisplayPassword = true;
    return res.render("admin/users/create", { notDisplayPassword });
  },
  async post(req, res) {
    
    const initPassword = crypto.randomBytes(2).toString("hex");
    const hashPassword = await hash(initPassword, 8);

    try {
      
      req.body.password = hashPassword;
      const userId = await Users.create(req.body);
      const user = await Users.findOne({ where: { id: userId } });
      const userLogged = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const token = crypto.randomBytes(20).toString("hex");      

      await Users.update(user.id, {
        reset_token: token,
      });

      await mailer.sendMail({
        to: userLogged.email,
        from: "andretorquato@foodfy.master",
        subject: `Criando sua conta`,
        html: `
                <h2>Sejá bem vindo a foodfy! ${user.name}</h2>
                <p>Para finalizar seu cadastro precisamos que faço o cadastro de sua senha!</p>
                <p>Clique no link abaixo para criar sua senha</p>
                <p>Foi gerada uma senha inicial para acesso: ${initPassword}</p>
                <br>
                <p>Caso deseje cadastrar sua senha CLIQUE APENAS NO LINK ABAIXO</p>
                    <p>
                        <a href="http://localhost:3000/admin/users/${user.id}/profile?token=${token}" target="_blank">
                        CADASTRANDO SUA SENHA
                        </a>
                    </p>

                `,
      });

      return res.render("admin/users/index", {
        success: "O usuário já pode cadastra sua senha",
      });
    } catch (error) {
      console.log(error);
      return res.render("admin/users/index", {
        error: "Erro inesperado!",
      });
    }
  },
  async createPassword(req, res) {
    const user = req.user;
    const { password, token } = req.body;
    
    try {
      const newPassword = await hash(password, 8);

      await Users.update(user.id, {
        password: newPassword,
        reset_token: "",
      });
      req.session.destroy();
      return res.render("admin/session/login", {
        success: "Senha Atualizada com sucesso, faça login!",
      });
    } catch (error) {
      console.log(error);
      return res.render("admin/users/profile", {
        user: req.body,
        token,
        error: "Error inesperado, tente novamente!",
      });
    }
  },
  async update(req, res) {
    try {
      let { user } = req.session;
      let { email, name, is_admin } = req.body;

      

      Users.update(req.body.id, {
        email,
        name,
        is_admin      
      });

      return res.redirect(`/admin/users`);
    } catch (error) {
      console.log(error);
    }
  },
  delete(req, res) {
    const { id } = req.body;

    if(id == req.session.user.id) {
      // load user
      return res.render("admin/users/index",{
        error: "Ops... Você não pode deletar sua propria conta :)"
      })
    }else{
      Users.delete(id);
      return res.redirect("/admin/users");
    }

    
  },
};
