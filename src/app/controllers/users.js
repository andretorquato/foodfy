const data = require("../../../data.json");
const Chefs = require("../models/chefs");
const Recipes = require("../models/recipes");

module.exports = {
  redirect(req, res) {
    
    return res.redirect("/index");
  },
  index(req, res) {
    Recipes.allChefs(function(recipes){
      Recipes.chefSelect(function(options){
        return res.render("users/index", { recipes, options });
      });
      
    })
    
    
  },
  recipes(req, res) {
    res.render("users/recipes", { items: data.recipes });
  },
  recipesToItem(req, res) {
    const { index } = req.params;

    findRecipe = data.recipes.find((recipe) => recipe.id == index);
    if (!findRecipe) res.send(404);

    res.render("users/recipe", { item: findRecipe });
  },
  about(req, res) {
    return res.render("users/about");
  },
  chefs(req, res) {
    Chefs.allChefs(function(chefs) {
      return res.render("users/chefs", { chefs });
    })
    
  },
};
