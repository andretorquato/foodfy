const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
  async post(data) {
    const query = `
         INSERT INTO recipes(
             chef_id,
             title,
             ingredients,
             preparations,
             information,
             user_id
         ) VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id
        `;
    
    const values = [
      data.chef_id,
      data.title,
      Array(data.ingredients),
      Array(data.preparations),
      data.information,
      data.user_id
    ];

    let result = await db.query(query, values);
    result = result.rows[0];
    
    return result;
  },
  allChefs() {
      
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_create
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      
      ORDER BY updated_at DESC
      LIMIT 6`);

  },
  find(id) {
        return db.query(
          `
          SELECT recipes.*, chefs.name AS chef_create
          FROM recipes
          LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
          WHERE recipes.id = $1
          `,
          [id]);
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
  delete(id) {
      
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
    
  },
  chefSelect() {
    return db.query(`SELECT name, id FROM chefs`);
  },
  paginate(params) {
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

    return db.query(query, [limit, offset]);
  }
};
