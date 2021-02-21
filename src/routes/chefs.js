const express = require('express');

const routes = express.Router();
const ChefsController = require('../app/controllers/chefs');
const multer = require('../app/middlewares/multer');

routes.get('/chefs', ChefsController.index);
routes.get('/chefs/create', ChefsController.create);
routes.get('/chefs/:id', ChefsController.show);
routes.get('/chefs/:id/edit', ChefsController.edit);
routes.post('/chefs', multer.array("image", 1),ChefsController.post);
routes.put('/chefs', multer.array("image",1), ChefsController.put);
routes.delete('/chefs', ChefsController.delete);

module.exports = routes;