const User = require("../models/users");
const { compare } = require("bcryptjs");

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
async function forgot(req, res, next) {
  
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  
  try {
    
    if (!user)
    return res.render("admin/session/forgot-password", {
      email: email,
      error: "Usuário não encontrado.",
    });
    
    req.user = user;
      
    } catch (error) {
      console.error(error);
      return res.render("admin/session/forgot-password", {
        email: req.body.email,
        error: "Ops.. Ocorreu algum erro inesperado, tente novamente.",
      });
    }
    
    
    next();
  }

  async function reset(req, res, next){
    const { email, password, passwordRepeat, token } = req.body;
    const user = await User.findOne({ where: { email } });
      try {
  
        if (!user)
          return res.render("admin/session/forgot-password", {
            email: email,
            error: "Usuário não encontrado.",
          });
        
        if(password != passwordRepeat) return res.render("admin/session/forgot-password-form", {
          user: req.body,
          token,
          error:"As senhas não conferem, tente novamente"
        })
  
        if(token != user.reset_token) return res.render("admin/session/forgot-password-form", {
          user: req.body,
          token,
          error:"Token invalido!"
        })
  
        
        let now = new Date();
        now = now.setHours(now.getHours());
        
        if(now > user.reset_token_expires) return res.render("admin/session/forgot-password-form", {
          user: req.body,
          token,
          error:"Token expirado, solicite uma nova recuperação de senha!"
        })
  
        req.user = user;
        
      } catch (error) {
        console.error(error);
        return res.render("admin/session/forgot-password", {
          email: req.body.email,
          token,
          error: "Ops.. Ocorreu algum erro inesperado, tente novamente.",
        });
      }
    
    
    next(); 
  }
  
  module.exports = {
    login,
    forgot,
    reset
};
