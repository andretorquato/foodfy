const Chefs = require("../models/chefs");
const Recipes = require("../models/recipes");
const Files = require("../models/files");
const LoadChefs = require("../services/LoadChefs");
const LoadRecipes = require("../services/LoadRecipes");


module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  async index(req, res) {
    const user = req.session.user;
    try {
      let chefs = await Chefs.allChefs();
      chefs = chefs.map(LoadChefs.format);   
      chefs = await Promise.all(chefs);
      
      return res.render("admin/chefs/index", { chefs, user });
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res) {
    const { id } = req.params;

    let chef = await Chefs.find(id);
    
    chef.img = await LoadChefs.getImages(chef.file_id);
    
    let recipes = await Chefs.myRecipes(id);
    recipes = recipes.map(LoadRecipes.format);
    recipes = await Promise.all(recipes);
    return res.render("admin/chefs/show", {
      chef,
      recipes,
      user: req.session.user,
    });
  },
  async edit(req, res) {
    const { id } = req.params;
    let chef = await Chefs.find(id);
    return res.render("admin/chefs/edit", { chef });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    const image = req.files[0];
    try {
      const idImageChef = await Files.create({
        ...image,
        path: `${image.path.replace(/\\/g, "/")}`,
      });
      
      const chefId = await Chefs.create({
         name: req.body.name, 
         file_id: idImageChef
        });

      return res.redirect(`chefs/${chefId}`);
    } catch (error) {
      console.log(error);
    }
  },
  async put(req, res) {
    try {
      if (req.files[0]) {
        const idImageChef = await Files.create({
          ...req.files[0],
          path: `${req.files[0].path.replace(/\\/g, "/")}`,
        });
        const data = {
          ...req.body,
          file_id: idImageChef,
        };

        const { name, file_id } = data;
        const chef = await Chefs.update(req.body.id, { name, file_id });

        await Files.deleteChefImg(req.body.file_id);
      } else {
        const { name } = req.body;
        const chef = await Chefs.update(req.body.id, { name });
      }
      return await res.redirect(`/admin/chefs/${req.body.id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    const { id, file_id } = req.body;

    let recipes = await Chefs.myRecipes(id);
    const deleteRecipes = recipes.map(async (recipe) => {
      files = await Files.getAllFilesIdFromRecipe(recipe.id);

      const deleteFiles = await files.map((file) => Files.delete(file.file_id));

      await Promise.all([deleteFiles]).then(() => {
        return Recipes.delete(recipe.id);
      });
    });

    const deleteAll = await Promise.all(deleteRecipes).then(() => {
      Chefs.delete(id);
      Files.deleteChefImg(file_id);
    });

    return res.redirect("/admin/chefs");
  },
};
