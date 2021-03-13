const db = require("../../config/db");
const Files= require("../models/files");
const Recipes = require("../models/recipes");

const { hash } = require("bcryptjs");

module.exports = {
  async findOne(filters) {
    let query = "SELECT * FROM users";

    Object.keys(filters).map((key) => {
      query = `${query} 
            ${key}
            `;

      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field} = '${filters[key][field]}'`;
      });
    });

    const results = await db.query(query);

    return results.rows[0];
  },
  async create(data) {
    const query = `
            INSERT INTO users (
                name,
                email,
                password,
                is_admin
            ) VALUES($1, $2, $3, $4)
            RETURNING id
        `;
    
    const values = [
      data.name,
      data.email,
       data.password,
      data.is_admin || false,
    ];

    const result = await db.query(query, values);

    return result.rows[0].id;
  },
  allChefs() {
    const query = `
            SELECT * FROM users
            ORDER BY updated_at DESC
            `;

    return db.query(query);
  },
  async update(id, fields){
    let query = "UPDATE users SET"

    Object.keys(fields).map((key, index, array) => {
        if(( index +1 ) < array.length){
            query = `${query} 
              ${key} = '${fields[key]}',
            `
        }else{
          query = `${query}
            ${key} = '${fields[key]}'
              WHERE id = ${id}
          `
        }
    })
    await db.query(query);
    return;
  },
  async delete(id){
    let recipes = await db.query(`SELECT * FROM recipes WHERE user_id = $1`,[id]);
    recipes = recipes.rows;
    try {
      const deleteRecipes = recipes.map(async (recipe) => {
        files = await Files.getAllFilesIdFromRecipe(recipe.id);
  
        const deleteFiles = await files.map((file) => Files.delete(file.file_id));
  
        await Promise.all([deleteFiles]).then(() => {
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
