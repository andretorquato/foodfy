const express = require('express');

const recipes = require('./src/app/controllers/recipes');
const admin = require('./src/app/controllers/admin');
const chefs = require('./src/app/controllers/chefs');

const routes = express.Router();

routes.get('/', recipes.index);
routes.get('/index', recipes.index);
routes.get('/recipes', recipes.recipes);
routes.get('/recipes/:index', recipes.recipesToItem);
routes.get('/about', recipes.about);
routes.get('/chefs', recipes.chefs);

routes.get('/admin', admin.redirect);
routes.get('/admin/recipes', admin.index);
routes.get('/admin/recipes/create', admin.create);
routes.get('/admin/recipes/:id', admin.show);
routes.get('/admin/recipes/:id/edit', admin.edit);
routes.post('/admin/recipes', admin.post);
routes.put('/admin/recipes', admin.put);
routes.delete('/admin/recipes', admin.delete);

routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id', chefs.show);
routes.get('/admin/chefs/:id/edit', chefs.edit);
routes.post('/admin/chefs', chefs.post);
routes.put('/admin/chefs', chefs.put);
routes.delete('/admin/chefs', chefs.delete);

module.exports = routes;