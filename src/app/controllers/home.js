const Chefs = require("../models/chefs");
const Recipes = require("../models/recipes");
const Files = require("../models/files");
const LoadRecipes = require("../services/LoadRecipes");

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
      recipes = recipes.map(LoadRecipes.format);
      
      recipes = await Promise.all(recipes);
      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
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
      chefs = chefs.rows;


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
      chefs = chefs.rows;
      let auxChefs = [];

      chefs = chefs.map(async (chef) => {
        let image = await Files.getFiles(chef.file_id);
        image = image.rows[0];

        image = {
          ...image,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        };
        return {
          ...chef,
          image: image.src,
          imageName: image.name,
        };
      });

      chefs = await Promise.all(chefs);

      return res.render("home/chefs", { chefs });
    } catch (error) {
      console.log(error);
    }
  },
};
