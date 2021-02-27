const Recipes = require("../models/recipes");
const Files = require("../models/files");

module.exports = {
  async index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
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
      
      let total = 1;
      if(recipes.length > 0){
        total = Math.ceil(recipes[0].total / limit);
      }
      
      const pagination = {
        total: total,
        page,
      };

      return res.render("admin/recipes/index", {
        recipes,
        pagination,
        filter,
        images,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res) {
    const { id } = req.params;
    try {
      let recipe = await Recipes.find(id);
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

      return res.render("admin/recipes/show", { recipe, chefs, files });
    } catch (error) {
      console.log(error);
    }
  },
  async edit(req, res) {
    const { id } = req.params;
    try {
      let recipe = await Recipes.find(id);
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
        return files.push(file.rows[0]);
      });

      await Promise.all(filesPromise);

      files = files.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));

      return res.render("admin/recipes/edit", {
        recipe,
        options: chefs,
        files,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async create(req, res) {
    let chefs = await Recipes.chefSelect();
    chefs = chefs.rows;
    return res.render("admin/recipes/create", { options: chefs });
  },
  async post(req, res) {
    try {
      // let idFiles = [];
      // let recipe = await Recipes.post(req.body);

      // const filesPromise = req.files.map(async (file) => {
      //   const id = await Files.create({
      //     ...file,
      //     path: `${file.path.replace(/\\/g, "/")}`,
      //   });
      //   idFiles.push(id.rows[0].id);
      // });

      // await Promise.all(filesPromise, recipe).then(() => {
      //   idFiles.forEach((idFile) => {
      //     Files.createReferenceRecipeImages(recipe.id, idFile);
      //   });
      // });

      // return res.redirect(`/admin/recipes/${recipe.id}`);
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
      if (req.files.length != 0) {
        let idFiles = [];
        const filesPromise = req.files.map(async (file) => {
          const id = await Files.create({
            ...file,
            path: `${file.path.replace(/\\/g, "/")}`,
          });
          idFiles.push(id.rows[0].id);
        });

        await Promise.all(filesPromise).then(() => {
          idFiles.forEach((idFile) => {
            Files.createReferenceRecipeImages(req.body.id, idFile);
          });
        });
      }

      Recipes.put(req.body);

      return res.redirect(`/admin/recipes/${req.body.id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      let files = req.body.files;
      if(typeof files == 'string'){
        files = Array(files);
      };      
      files = files.map((file) => file);
      

      const deleteFiles = await files.map((file) => Files.delete(file));

      await Promise.all([deleteFiles]).then(() => {
        Recipes.delete(req.body.id);
      });

      return res.redirect("/admin");
    } catch (error) {
      console.log(error);
    }
  },
};
