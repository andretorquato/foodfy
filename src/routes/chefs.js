const express = require("express");

const routes = express.Router();
const ChefsController = require("../app/controllers/chefs");
const multer = require("../app/middlewares/multer");

const { userIsNotLogged } = require("../app/middlewares/session");

routes.get("/chefs", userIsNotLogged, ChefsController.index);
routes.get("/chefs/create", userIsNotLogged, ChefsController.create);
routes.get("/chefs/:id", userIsNotLogged, ChefsController.show);
routes.get("/chefs/:id/edit", userIsNotLogged, ChefsController.edit);
routes.post("/chefs", multer.array("image", 1), ChefsController.post);
routes.put("/chefs", multer.array("image", 1), ChefsController.put);
routes.delete("/chefs", ChefsController.delete);

module.exports = routes;
