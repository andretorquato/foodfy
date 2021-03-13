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
  async update(id, fields) {
    try {
      let query = "UPDATE chefs SET"

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
    } catch (error) {
      console.error(error);
    }
  
    
    
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
