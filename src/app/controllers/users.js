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
  async recipes(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * ( page - 1);
    const params = {
      page,
      limit,
      offset,
      filter,
    }
    try {
    let recipes = await Recipes.paginate(params);
    recipes = recipes.rows;
    const pagination = {
      total: Math.ceil(recipes[0].total / limit ),
      page,
      
    }
    return res.render("users/recipes", { recipes, pagination, filter });  
    } catch (error) {
      console.log(error);
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
