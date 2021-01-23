const express = require('express');

const users = require('./controllers/users');
const admin = require('./controllers/admin');

const routes = express.Router();

routes.get('/', users.index);
routes.get('/index', users.index);
routes.get('/recipes', users.recipes);
routes.get('/recipes/:index', users.recipesToItem);
routes.get('/about', users.about);

routes.get('/admin', admin.index);
routes.get('/admin/create', admin.create);
routes.get('/admin/:id', admin.show);
routes.get('/admin/:id/edit', admin.edit);
routes.post('/admin', admin.post);
routes.put('/admin', admin.put);
routes.delete('/admin', admin.delete);

module.exports = routes;