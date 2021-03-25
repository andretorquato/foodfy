const Recipes = require("../models/recipes");
const Files = require("../models/files");

async function getImages(recipeId) {
  try {
    let files = await Files.getAllFilesIdFromRecipe(recipeId);

    files = files.map(async (file) => {
      file = await Files.getFiles(file.file_id);
      return {
        ...file,
        src: `${file.path.replace("public", "")}`,
      };
    });
    files = await Promise.all(files);
    return files;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function format(recipe) {
  try {
    const files = await getImages(recipe.id);
    recipe.img = files[0].src;
    recipe.files = files;
    return recipe;
  } catch (error) {
    console.error(error);
    return;
  }
}
const LoadService = {
  load(service, filter) {
    return this[service]();
  },
  async recipe() {
    try {
      const recipe = await Recipes.findOne(this.filter);
      return format(recipe);
    } catch (error) {
      console.error(error);
    }
  },
  async recipes() {
    try {
      const recipes = await Recipes.findAll(this.filter);
      const recipesPromise = recipes.map(format);
      return Promise.all(recipesPromise);
    } catch (error) {
      console.error(error);
    }
  },
  format,
};

module.exports = LoadService;
