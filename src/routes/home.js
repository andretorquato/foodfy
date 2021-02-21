const express = require('express');

const routes = express.Router();

const HomeController = require('../app/controllers/home');

routes.get('/', HomeController.redirect);
routes.get('/index', HomeController.index);
routes.get('/recipes', HomeController.recipes);
routes.get('/recipes/:index', HomeController.recipesToItem);
routes.get('/about', HomeController.about);
routes.get('/chefs', HomeController.chefs);

module.exports = routes;