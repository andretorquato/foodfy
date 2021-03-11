const User = require("../models/users");

async function post(req, res, next) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "" && key != "token" ) {
      return res.render("admin/users/create", {
        notDisplayPassword: true,
        user: req.body,
        error: "Preencha todos os campos",
      });
    }
  }

  let { email } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user)
    return res.render("admin/users/create", {
      error: "Este e-mail já foi cadastrado!",
    });

  next();
}

async function update(req, res, next) {
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == "" && key != "token" ){
      res.render("admin/users/edit", {
        notDisplayPassword: true,
        user: req.body,
        error: `Preencha todos os campos`,
      });

      return;
    }
  }

  req.body.is_admin = req.body.is_admin == undefined ? false : true;

  next();
}

async function userCreatePassword(req, res, next) {
    const { id, token } = req.body;
    const user = await User.findOne({ where: { id } });
  
      try {
  
        if (!user)
          return res.render("admin/users/profile", {
            email: email,
            error: "Usuário não encontrado.",
          });
        
        if(token != user.reset_token) return res.render("admin/users/profile", {
          user: req.body,
          token,
          error:"Token invalido!"
        })
  
        req.user = user;
        
      } catch (error) {
        console.error(error);
        return res.render("admin/users/profile", {
          email: req.body.email,
          token,
          error: "Ops.. Ocorreu algum erro inesperado, tente novamente.",
        });
      }
    
    
    next(); 
  }
module.exports = {
  post,
  update,
  userCreatePassword
};
