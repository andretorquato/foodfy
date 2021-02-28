const Recipes = require("../models/recipes");

async function post(req, res, next){

    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        return res.render("admin/recipes/create",{
          recipe: req.body,
          error: "Preencha todos os campos"
        });
      }
    }
    if (req.files.length == 0) {
      return res.render("admin/recipes/create",{
        error: "Insira pelo menos uma imagem"
      });
    }
    next();
}


module.exports = {
    post
}