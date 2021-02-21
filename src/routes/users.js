const express = require('express');

const routes = express.Router();
const UsersController = require('../app/controllers/users');
const multer = require('../app/middlewares/multer');

routes.get('/users', UsersController.index);
routes.get('/users/create', UsersController.create);
routes.get('/users/:id/profile', UsersController.profile);
routes.get('/users/:id/edit', UsersController.edit);
routes.post('/users', multer.array("image", 1),UsersController.post);
routes.put('/users', multer.array("image",1), UsersController.put);
routes.delete('/users', UsersController.delete);


module.exports = routes;