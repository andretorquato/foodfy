const db = require('../../config/db');
const fs = require('fs');

module.exports = {
    create(data){
        const query = `
            INSERT INTO files(
            name,
            path
            ) VALUES($1, $2)
            RETURNING id
        `;
        const values = [
            data.filename,
            data.path,
        ]
        return db.query(query, values);
    },
    createReferenceRecipeImages(recipe_id, file_id){
        const query = `
        INSERT INTO recipe_files(
        recipe_id,
        file_id
        ) VALUES($1, $2)
        RETURNING id
    `;
    const values = [
        recipe_id,
        file_id,
    ]
    return db.query(query, values);
    },
    getFiles(id){
        return db.query(`SELECT * FROM files WHERE id = $1`, [id]);
    },
    getIdRecipesFiles(id){
            return db.query(`SELECT file_id FROM recipe_files WHERE recipe_id = $1`, [id]);
    },
    async delete(id){
        const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
        const file = result.rows[0];
        fs.unlinkSync(file.path);
        
        const deleteFromTAbleRecipesFiles = await db.query(`DELETE FROM recipe_files WHERE file_id = $1;`,[id]);
        const deleteFromTableFiles = db.query(`DELETE FROM files WHERE id = $1`, [id]);
        
        return deleteFromTAbleRecipesFiles, deleteFromTableFiles;
    },
    async deleteChefImg(id){
        const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
        const file = result.rows[0];
        await db.query(`DELETE FROM files WHERE id = $1`, [id]);
        fs.unlinkSync(file.path);

        return;
    }
}