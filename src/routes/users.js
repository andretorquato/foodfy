const express = require('express');

const routes = express.Router();
const UsersController = require('../app/controllers/users');

const UserValidator = require('../app/validators/users');

routes.get('/users', UsersController.index);
routes.get('/users/create', UsersController.create);
routes.get('/users/:id/profile', UsersController.profile);
routes.get('/users/:id/edit', UsersController.edit);
routes.post('/users', UserValidator.post,UsersController.post);
routes.put('/users', UserValidator.update, UsersController.put);
routes.delete('/users', UsersController.delete);


module.exports = routes;