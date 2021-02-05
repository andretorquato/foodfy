const fs = require("fs");
const data = require("../../../data.json");
const Recipes = require("../models/recipes");
module.exports = {
  redirect(req, res) {
    return res.redirect("admin/recipes");
  },
  index(req, res) {
    return res.render("admin/recipes/index", { recipes: data.recipes });
  },
  show(req, res) {
    const { id } = req.params;

    const findRecipe = data.recipes.find((recipe) => recipe.id == id);
    if (!findRecipe) return res.render("admin/recipes/create");

    return res.render("admin/recipes/show", { recipe: findRecipe });
  },
  edit(req, res) {
    const { id } = req.params;
    const findRecipe = data.recipes.find((recipe) => recipe.id == id);

    res.render("admin/recipes/edit", { recipe: findRecipe });
  },
  create(req, res) {
    return res.render("admin/recipes/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/recipes/create");
        alert("preencha todos os campos");
        return;
      }
    }
    
    



    
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    const findRecipe = data.recipes.find((recipe, idRecipe) => {
      if (recipe.id == id) index = idRecipe;
      return true;
    });

    if (!findRecipe) return res.send("error not found");
    data.recipes[index] = {
      ...req.body,
    };
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("error write file");

      res.redirect("/admin");
    });
  },
  delete(req, res) {
    const { id } = req.body;
    const findRecipe = data.recipes.filter((recipe) => recipe.id != id);

    if (!findRecipe) return res.send("not found");

    data.recipes = findRecipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("error write file");

      return res.redirect("/admin");
    });
  },
};
