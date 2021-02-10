const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
  post(data, callback) {
    const query = `
         INSERT INTO recipes(
             chef_id,
             image,
             title,
             ingredients,
             preparations,
             information,
             created_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id
        `;
    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error ${err}`;

      callback(results.rows[0]);
    });
  },
  allChefs(callback) {
    db.query(`
    SELECT recipes.*, chefs.name AS chef_create
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    `, function (err, results) {
      if (err) throw `Database error ${err}`;

      return callback(results.rows);
    });
  },
  find(id, callback) {
    db.query(
      `
      SELECT recipes.*, chefs.name AS chef_create
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1
      `,
      [id],
      function (err, results) {
        if (err) throw `Database error ${err}`;

        return callback(results.rows[0]);
      }
    );
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
  put(data, callback) {
    const query = `
            UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparations=($5),
            information=($6)
            WHERE id = $7
        `;
    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      data.id,
    ];
    db.query(query, values, function (err) {
      if (err) throw `Database error ${err}`;

      return callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function (err) {
      if (err) throw `Database error ${err}`;

      return callback();
    });
  },
  chefSelect(callback) {
    db.query(`SELECT name, id FROM chefs`, function (err, results) {
      if (err) throw `Database error ${err}`;

      return callback(results.rows);
    });
  },
  paginate(params) {
    let { filter, limit, offset, callback } = params;

    let query = "";
    filterQuery = "";
    totalQuery = `(SELECT count(*) FROM recipes) AS total`;

    if( filter ){
      filterQuery = ` WHERE recipes.title ILIKE '%${filter}%'`

      totalQuery = `
      (SELECT count(*) FROM recipes
      ${filterQuery}
      ) AS total`
    }

    query = `
      SELECT recipes.*, ${totalQuery}, chefs.name AS chef_create
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ${filterQuery}
      LIMIT $1 OFFSET $2
    `
    
    return db.query(query,[limit, offset]);
  }
};
