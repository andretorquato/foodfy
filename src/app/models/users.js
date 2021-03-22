const db = require("../../config/db");
const Files= require("../models/files");
const Recipes = require("../models/recipes");
const Base = require("./Base");

Base.init({ table: 'users'});

module.exports = {
  ...Base,
  async delete(id){
    let recipes = await db.query(`SELECT * FROM recipes WHERE user_id = $1`,[id]);
    recipes = recipes.rows;
    try {
      const deleteRecipes = recipes.map(async (recipe) => {
        files = await Files.getAllFilesIdFromRecipe(recipe.id);
  
        const deleteFiles = await files.map((file) => Files.delete(file.file_id));
  
        await Promise.all(deleteFiles).then(() => {
          return Recipes.delete(recipe.id);
        });
      });  
      
    const deleteAll = await Promise.all(deleteRecipes).then(() => {
      try {
        let deleteUser = db.query(`DELETE FROM users WHERE id = $1`, [id]);  
      } catch (error) {
        console.error(error);
      } 
    });
    return deleteAll;
    } catch (error) {
      console.error(error);
      return;
    }
  } 
};
