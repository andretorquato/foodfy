const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
  post(data) {
    const query = `
         INSERT INTO chefs(
             name,
             file_id,
             created_at
         ) VALUES ($1, $2, $3)
         RETURNING id
        `;
    const values = [data.name, data.file_id, date(Date.now()).iso];

    return db.query(query, values);
    
  },
  allChefs() {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY qtd_recipes
        `;

      return   db.query(query);
    
  },
  find(id) {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id
        `;

      return db.query(query, [id]);    
  },
  put(data) {
    const query = `
            UPDATE chefs SET
            name=($1),
            file_id=($2)
            WHERE id = $3
        `;
    const values = [data.name, data.file_id, data.id];
    
    return db.query(query, values);
    
  },
  delete(id) {
    
    return db.query(`DELETE FROM chefs WHERE id = $1`, [id]);
    
  },
  myRecipes(id){
      const query = `
      SELECT recipes.*
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1 
      GROUP BY recipes.id
      `;

    return  db.query(query, [id]);      
  }
};
