const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
    createRecipe(data, callback) {
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
        `
        const values = [
            data.chef_id,
             data.image,
             data.title,
             data.ingredients,
             data.preparations,
             data.information,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err, results){
            if(err) throw `Database error ${err}`;

            callback(results.rows[0]);
        });
    },
    allChefs(callback){
        db.query(`SELECT * FROM chefs`, function(err, results){
            if(err) throw `Database error ${err}`;

            return callback(results.rows);
        })
    },
     find(id, callback){
         db.query(`SELECT * FROM chefs WHERE id = $1`, [id], function(err, results){
             if(err) throw `Database error ${err}`;

             return callback(results.rows[0]);
         })
     },
     put(data, callback){

        const query = `
            UPDATE chefs SET
            name=($1),
            avatar_url=($2)
            WHERE id = $3
        `; 
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ];
        db.query(query, values, function(err){
            if(err) throw `Database error ${err}`;

            return callback();
        })
     },
     delete(id, callback){
         db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err){
             if(err) throw `Database error ${err}`;

             return callback();
         })
     }
    
}