const Chefs = require("../models/chefs");
const Recipes = require("../models/recipes");
const LoadRecipes = require("../services/LoadRecipes");
const LoadChefs = require("../services/LoadChefs");

module.exports = {
  redirect(req, res) {
    return res.redirect("/index");
  },
  async index(req, res) {
    try {
      let recipes = await Recipes.homeLoadingRecipes();

      recipes = await recipes.map(LoadRecipes.format);
      recipes = await Promise.all(recipes);

      return res.render("home/index", { recipes });
    } catch (error) {
      console.log(error);
    }
  },
  async recipes(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 6;
    let offset = limit * (page - 1);
    const params = {
      page,
      limit,
      offset,
      filter,
    };
    try {
      let recipes = await Recipes.paginate(params);
      
      recipes = recipes.rows;
      let totalRecipes = recipes[0] ? recipes[0].total : 1;
      recipes = recipes.map(LoadRecipes.format);
      
      recipes = await Promise.all(recipes);
      const pagination = {
        total: Math.ceil(totalRecipes / limit),
        page,
      };

      return res.render("home/recipes", {
        recipes,
        pagination,
        filter
      });
    } catch (error) {
      console.log(error);
    }
  },
  async recipesToItem(req, res) {
    const { index } = req.params;
    try {
      let recipe = await Recipes.find(index);
      
      recipe = await LoadRecipes.format(recipe);      
      let chefs = await Recipes.chefSelect();
      
      return res.render("home/recipe", { item: recipe, chefs });
    } catch (error) {
      console.log(error);
    }
  },
  about(req, res) {
    return res.render("home/about");
  },
  async chefs(req, res) {
    try {
      let chefs = await Chefs.allChefs();

      chefs = chefs.map(LoadChefs.format);
      chefs = await Promise.all(chefs);
      return res.render("home/chefs", { chefs });
    } catch (error) {
      console.log(error);
    }
  },
};
