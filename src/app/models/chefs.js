const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
  post(data, callback) {
    const query = `
         INSERT INTO chefs(
             name,
             avatar_url,
             created_at
         ) VALUES ($1, $2, $3)
         RETURNING id
        `;
    const values = [data.name, data.avatar_url, date(Date.now()).iso];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error ${err}`;

      callback(results.rows[0]);
    });
  },
  allChefs(callback) {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY qtd_recipes
        `;

    db.query(query, function (err, results) {
      if (err) throw `Database error ${err}`;

      return callback(results.rows);
    });
  },
  find(id, callback) {
    const query = `
        SELECT chefs.*, count(recipes) AS qtd_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id
        `;

    db.query(query, [id], function (err, results) {
      if (err) throw `Database error ${err}`;

      return callback(results.rows[0]);
    });
  },
  put(data, callback) {
    const query = `
            UPDATE chefs SET
            name=($1),
            avatar_url=($2)
            WHERE id = $3
        `;
    const values = [data.name, data.avatar_url, data.id];
    db.query(query, values, function (err) {
      if (err) throw `Database error ${err}`;

      return callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function (err) {
      if (err) throw `Database error ${err}`;

      return callback();
    });
  },
  myRecipes(id, callback){
      const query = `
      SELECT recipes.*
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1 
      GROUP BY recipes.id
      `;

      db.query(query, [id], function (err, results){
          if (err) throw `Database error ${err}`;

          return callback(results.rows);
      })
  }
};
