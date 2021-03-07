const crypto = require("crypto");
const { hash } = require("bcryptjs");

const User = require("../models/users");
const mailer = require("../../libs/mailer");

module.exports = {
  loginRedirect(req, res) {
    return res.render("admin/session/login");
  },
  forgotPassword(req, res) {
    return res.render("admin/session/forgot-password");
  },
  forgotPasswordForm(req, res) {
    return res.render("admin/session/forgot-password-form", {
      token: req.query.token,
    });
  },
  login(req, res) {
    req.session.user = {
      name: req.user.name,
      id: req.user.id,
      is_admin: req.user.is_admin,
    };
    return res.redirect("/admin/recipes");
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/admin");
  },
  async forgot(req, res) {
    const user = req.user;
    const token = crypto.randomBytes(20).toString("hex");

    try {
      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: "andretorquato@foodfy.master",
        subject: `Recuperação de Senha`,
        html: `
                <h2>Perdeu a senha?</h2>
                <p>Clique no link abaixo para recuperar sua senha</p>
                    <p>
                        <a href="http://localhost:3000/admin/forgot-password-form?token=${token}" target="_blank">
                        RECUPERAR SENHA
                        </a>
                    </p>
                `,
      });
      return res.render("admin/session/login", {
        success: "Verifique seu email para recuperar sua senha!",
      });
    } catch (error) {
      console.error(error);

      return res.render("admin/session/forgot-password", {
        error: "Erro inesperado!",
      });
    }
  },
  async resetPassword(req, res) {
    const user = req.user;
    const { password, token } = req.body;

    try {
      const newPassword = await hash(password, 8);

      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });

      return res.render("admin/session/login", {
        success: "Senha Atualizada com sucesso, faça login!",
      });
    } catch (error) {
      return res.render("admin/session/forgot-password-form", {
        user: req.body,
        token,
        error: "Error inesperado, tente novamente!",
      });
    }
  },
};
