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
        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) throw `Database error ${err}`;

            return callback(results.rows);
        })
    },
     find(id, callback){
         db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results){
             if(err) throw `Database error ${err}`;

             return callback(results.rows[0]);
         })
     },
     put(data, callback){

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
            data.id
        ];
        db.query(query, values, function(err){
            if(err) throw `Database error ${err}`;

            return callback();
        })
     },
     delete(id, callback){
         db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err){
             if(err) throw `Database error ${err}`;

             return callback();
         })
     },
     chefSelect(callback){
         db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database error ${err}`;

            return callback(results.rows);
         })
     }
    
}