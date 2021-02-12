const db = require('../../config/db');

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
        INSERT INTO recipes_files(
        recipe_id,
        files_id,
        ) VALUES($1, $2)
        RETURNING id
    `;
    const values = [
        recipe_id,
        file_id,
    ]
    return db.query(query, values);
    }
}