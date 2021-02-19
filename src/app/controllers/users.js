const Chefs = require("../models/chefs");
const Recipes = require("../models/recipes");
const Files = require("../models/files");
module.exports = {
  redirect(req, res) {
    return res.redirect("/index");
  },
  async index(req, res) {
    try {
      let recipes = await Recipes.allChefs();
      recipes = recipes.rows;

      let chefs = await Recipes.chefSelect();
      chefs = chefs.rows;

      let files = [],
        images = [];
      let getIdsRecipes = recipes.map((recipe) => recipe.id);
      let filesId = getIdsRecipes.map(async (id) => {
        let file = await (await Files.getIdRecipesFiles(id)).rows[0];
        file.recipe_id = id;
        return files.push(file);
      });

      await Promise.all(filesId);

      files = files.map(async (file) => {
        let image = await (await Files.getFiles(file.file_id)).rows[0];
        return images.push({
          ...image,
          recipe_id: file.recipe_id,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        });
      });

      await Promise.all(files);

      return res.render("users/index", { recipes, options: chefs, images });
    } catch (error) {
      console.log(error);
    }
  },
  async recipes(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
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
      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
        page,
      };

      let files = [],
        images = [];
      let getIdsRecipes = recipes.map((recipe) => recipe.id);
      let filesId = getIdsRecipes.map(async (id) => {
        let file = await (await Files.getIdRecipesFiles(id)).rows[0];
        file.recipe_id = id;
        return files.push(file);
      });

      await Promise.all(filesId);

      files = files.map(async (file) => {
        let image = await (await Files.getFiles(file.file_id)).rows[0];
        return images.push({
          ...image,
          recipe_id: file.recipe_id,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        });
      });

      await Promise.all(files);
      console.log(images);
      return res.render("users/recipes", { recipes, pagination, filter, images });
    } catch (error) {
      console.log(error);
    }
  },
  async recipesToItem(req, res) {
    const { index } = req.params;
    try {
      let recipe = await Recipes.find(index);
      recipe = recipe.rows[0];

      let chefs = await Recipes.chefSelect();
      chefs = chefs.rows;

      let filesPromise = [],
        files = [];
      let filesRecipeId = await Files.getIdRecipesFiles(recipe.id);
      filesRecipeId = filesRecipeId.rows;

      filesRecipeId.map((file) => filesPromise.push(file.file_id));

      filesPromise = filesPromise.map(async (id) => {
        let file = await Files.getFiles(id);
        return file, files.push(file.rows[0]);
      });

      await Promise.all(filesPromise);

      files = files.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));

      return res.render("users/recipe", { item: recipe, chefs, files });
    } catch (error) {
      console.log(error);
    }
  },
  about(req, res) {
    return res.render("users/about");
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
        return auxChefs.push({
          ...chef,
          image: image.src,
          imageName: image.name,
        });
      });

      await Promise.all(chefs);

      chefs = auxChefs;
      console.log(chefs);
      return res.render("users/chefs", { chefs });
    } catch (error) {
      console.log(error);
    }
  },
};
