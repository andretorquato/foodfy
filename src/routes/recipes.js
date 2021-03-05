const express = require("express");

const routes = express.Router();
const RecipesController = require("../app/controllers/recipes");
const multer = require("../app/middlewares/multer");

const RecipesValidator = require("../app/validators/recipes");

const { userIsNotLogged } = require("../app/middlewares/session");

routes.get("/recipes", userIsNotLogged, RecipesController.index);
routes.get("/recipes/create", userIsNotLogged, RecipesController.create);
routes.get("/recipes/:id", userIsNotLogged, RecipesController.show);
routes.get("/recipes/:id/edit", userIsNotLogged, RecipesController.edit);
routes.post(
  "/recipes",
  multer.array("image", 6),
  RecipesValidator.post,
  RecipesController.post
);
routes.put("/recipes", multer.array("image", 6), RecipesController.put);
routes.delete("/recipes", RecipesController.delete);

module.exports = routes;
