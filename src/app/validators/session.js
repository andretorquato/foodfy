const User = require("../models/users");
const { compare, hash } = require("bcryptjs");

async function login(req, res, next) {
  const keys = Object.keys(req.body);
  for (let key of keys) {
    if (req.body[key] == "") {
      res.render("admin/session/login", {
        email: req.body.email,
        error: "Preencha todos os campos",
      });
      return;
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.render("admin/session/login", {
          email: email,
          error: "Usuário não encontrado.",
        });

      const passed = await compare(password, user.password);

      if (!passed)
        return res.render("admin/session/login", {
          email: email,
          error: "Senha incorreta.",
        });
      req.user = user;
    } catch (error) {
      console.error(error);
      return res.render("admin/session/login", {
        email: req.body.email,
        error: "Ops.. Ocorreu algum erro inesperado, tente novamente.",
      });
    }
  }

  next();
}

module.exports = {
  login,
};
