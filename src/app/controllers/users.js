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
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 1;
    let offset = limit * ( page - 1);
    const params = {
      page,
      limit,
      offset,
      callback(recipes){
        const pagination = {
          total: Math.ceil(recipes[0].total / limit ),
          page,
          
        }
        return res.render("users/recipes", { recipes, pagination, filter });
       }
    }
    Recipes.paginate(params);
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
