const express = require('express');

const routes = express.Router();
const RecipesController = require('../app/controllers/recipes');
const multer = require('../app/middlewares/multer');


routes.get('/recipes', RecipesController.index);
routes.get('/recipes/create', RecipesController.create);
routes.get('/recipes/:id', RecipesController.show);
routes.get('/recipes/:id/edit', RecipesController.edit);
routes.post('/recipes', multer.array("image", 6), RecipesController.post);
routes.put('/recipes',  multer.array("image", 6), RecipesController.put);
routes.delete('/recipes', RecipesController.delete);



module.exports = routes;