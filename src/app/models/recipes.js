const db = require("../../config/db");

const Base = require("../models/Base");
Base.init({ table: "recipes"});

module.exports = {
  ...Base,
  async homeLoadingRecipes() {
    let result = await db.query(`
    SELECT recipes.*, chefs.name AS chef_create
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    
    ORDER BY updated_at DESC
    LIMIT 6`);
    return result.rows;
  },
  findBy(filter, callback) {
    db.query(
      `
        SELECT recipes.*, chefs.name AS chef_create
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.title ILIKE '%${filter}%'
       `,
      function (err, results) {
        if (err) throw `Database error ${err}`;

        callback(results.rows);
      }
    );
  },
  put(data) {
    const query = `
            UPDATE recipes SET
            chef_id=($1),
            title=($2),
            ingredients=($3),
            preparations=($4),
            information=($5)
            WHERE id = $6
        `;
    
        
    
    
    if(typeof data.ingredients == 'string'){
      data.ingredients = Array(data.ingredients);
    }
    if(typeof data.preparations == 'string'){
      data.preparations = Array(data.preparations);
    }

    data.preparations.map(preparation => preparation != "");
    data.ingredients.map(ingredient => ingredient != "");
    
    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      data.id,
    ];
    
    return db.query(query, values);
    
  },
  chefSelect() {
    return db.query(`SELECT name, id FROM chefs`);
  },
  async paginate(params) {
    let { filter, limit, offset, callback } = params;

    let query = "";
    filterQuery = "";
    totalQuery = `(SELECT count(*) FROM recipes) AS total`;

    if (filter) {
      filterQuery = ` WHERE recipes.title ILIKE '%${filter}%'`;

      totalQuery = `
      (SELECT count(*) FROM recipes
      ${filterQuery}
      ) AS total`;
    }

    query = `
      SELECT recipes.*, ${totalQuery}, chefs.name AS chef_create
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ${filterQuery}
      ORDER BY updated_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await db.query(query, [limit, offset]);
    return result;
  }
};
