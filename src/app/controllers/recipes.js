const data = require("../../../data.json");
module.exports = {
  index(req, res) {
    res.render("users/index", { items: data.recipes });
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
    res.render("users/chefs");
  },
};
