const express = require('express');
const multer = require('./src/app/middlewares/multer');

const users = require('./src/app/controllers/users');
const recipes = require('./src/app/controllers/recipes');
const chefs = require('./src/app/controllers/chefs');

const routes = express.Router();

routes.get('/', users.redirect);
routes.get('/index', users.index);
routes.get('/recipes', users.recipes);
routes.get('/recipes/:index', users.recipesToItem);
routes.get('/about', users.about);
routes.get('/chefs', users.chefs);

routes.get('/admin', recipes.redirect);
routes.get('/admin/recipes', recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id', recipes.show);
routes.get('/admin/recipes/:id/edit', multer.array("imagesRecipes", 6), recipes.edit);
routes.post('/admin/recipes', multer.array("imagesRecipes", 6), recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);

routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id', chefs.show);
routes.get('/admin/chefs/:id/edit', chefs.edit);
routes.post('/admin/chefs', chefs.post);
routes.put('/admin/chefs', chefs.put);
routes.delete('/admin/chefs', chefs.delete);

module.exports = routes;