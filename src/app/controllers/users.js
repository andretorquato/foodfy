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
    const { filter } = req.query;
    if( filter ){
      Recipes.findBy(filter, function(recipes) {
        return res.render("users/recipes", { recipes, filter });
      })

    }else{
      Recipes.allChefs(function(recipes){
        return res.render("users/recipes", { recipes });  
    });
    
    }
    
    
  },
  recipesToItem(req, res) {
      const { index } = req.params;
      Recipes.find(index, function(recipe){
          return res.render("users/recipe", { item: recipe });
      })
    
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
