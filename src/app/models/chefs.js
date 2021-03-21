const db = require("../../config/db");
const Base = require("../models/Base");

Base.init({ table: "chefs"});

module.exports = {
  ...Base,
  async allChefs() {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY qtd_recipes
        `;

      const results = await db.query(query);
      return results.rows;
    
  },
  async find(id) {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id
        `;
      const result = await db.query(query, [id]);
      return result.rows[0];
  },
  async myRecipes(id){
      const query = `
      SELECT recipes.*
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1 
      GROUP BY recipes.id
      `;
    const results = await db.query(query, [id]);
    return results.rows;
  }
};
