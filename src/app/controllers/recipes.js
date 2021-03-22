const Recipes = require("../models/recipes");
const Files = require("../models/files");
const LoadRecipes = require("../services/LoadRecipes");

module.exports = {
  
  async index(req, res) {
    let { filter, page, limit } = req.query;
    page = page || 1;
    limit = limit || 4;
    let total = 1;
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
      let totalRecipes = recipes[0].total;
      recipes = await recipes.map(LoadRecipes.format);
      
      recipes = await Promise.all(recipes);
      console.log(recipes);
      if (recipes.length > 0) {
        total = Math.ceil(totalRecipes / limit);
      }

      const pagination = {
        total: total,
        page,
      };

      return res.render("admin/recipes/index", {
        recipes,
        pagination,
        filter        
      });
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res) {
    const { id } = req.params;
    try {
      let recipe = await Recipes.find(id);
      recipe = recipe;
      recipe = await LoadRecipes.format(recipe);
      let chefs = await Recipes.chefSelect();

      const userVerification =
        req.session.user.is_admin == true ||
        req.session.user.id == recipe.user_id;

      return res.render("admin/recipes/show", {
        recipe,
        chefs,        
        userVerification,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async edit(req, res) {
    const { id } = req.params;
    try {
      let recipe = await Recipes.find(id);
      recipe = await LoadRecipes.format(recipe);
      let chefs = await Recipes.chefSelect();
      
      return res.render("admin/recipes/edit", { recipe,options: chefs });
    } catch (error) {
      console.log(error);
    }
  },
  async create(req, res) {
    let chefs = await Recipes.chefSelect();
    return res.render("admin/recipes/create", { options: chefs });
  },
  async post(req, res) {
    try {
      let idFiles = [];
      let { title, ingredients, chef_id, preparations, information } = req.body;
    
      let idRecipe = await Recipes.create({
        chef_id,
        title,
        information,
        preparations: Array.isArray(preparations) ? preparations : Array(preparations),
        ingredients: Array.isArray(ingredients) ? ingredients : Array(ingredients),
        user_id: req.session.user.id
      });
      
      const filesPromise = req.files.map(async (file) => {
        const id = await Files.create({
          ...file,
          path: `${file.path.replace(/\\/g, "/")}`,
        });
        idFiles.push(id);
      });

      await Promise.all(filesPromise, idRecipe).then(() => {
        idFiles.forEach((idFile) => {
          Files.createReferenceRecipeImages(idRecipe, idFile);
        });
      });

      return res.redirect(`/admin/recipes/${idRecipe}`);
    } catch (error) {
      console.log(error);
    }
  },
  async put(req, res) {
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        res.redirect("admin/recipes/create");

        return;
      }
    }
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map((id) => Files.delete(id));

      await Promise.all(removedFilesPromise);
    }
    try {
      let { id, title, ingredients, chef_id, preparations, information } = req.body;

      if (req.files.length != 0) {
        let idFiles = [];
        const filesPromise = req.files.map(async (file) => {
          const id = await Files.create({
            ...file,
            path: `${file.path.replace(/\\/g, "/")}`,
          });
          idFiles.push(id);
        });

        await Promise.all(filesPromise).then(() => {
          idFiles.forEach((idFile) => {
            Files.createReferenceRecipeImages(req.body.id, idFile);
          });
        });
      }
      await Recipes.update(id,{
        chef_id,
        title,
        information,
        preparations: Array.isArray(preparations) ? preparations : Array(preparations),
        ingredients: Array.isArray(ingredients) ? ingredients : Array(ingredients),
        user_id: req.session.user.id
      });      

      return res.redirect(`/admin/recipes/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      let recipe = await Recipes.findOne({where: { id: req.body.id }});
      recipe = await LoadRecipes.format(recipe);
      const deleteFiles = await recipe.files.map(file => Files.delete(file.id));
      
      await Promise.all(deleteFiles).then(async () => await Recipes.delete(req.body.id));
      
      return res.redirect("/admin");
    } catch (error) {
      console.log(error);
    }
  },
};
