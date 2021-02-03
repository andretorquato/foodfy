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
        `
        const values = [
            data.name, 
            data.avatar_url,
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
     }
    
}