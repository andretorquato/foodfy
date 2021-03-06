const express = require("express");

const routes = express.Router();
const ChefsController = require("../app/controllers/chefs");
const multer = require("../app/middlewares/multer");

const {
  userIsNotLogged,
  userIsLoggedAndIsAdmin,
} = require("../app/middlewares/session");

routes.get("/chefs", userIsNotLogged, ChefsController.index);
routes.get("/chefs/:id", userIsNotLogged, ChefsController.show);
routes.get(
  "/chefs/create",
  userIsNotLogged,
  userIsLoggedAndIsAdmin,
  ChefsController.create
);
routes.get(
  "/chefs/:id/edit",
  userIsNotLogged,
  userIsLoggedAndIsAdmin,
  ChefsController.edit
);
routes.post(
  "/chefs",
  userIsLoggedAndIsAdmin,
  multer.array("image", 1),
  ChefsController.post
);
routes.put(
  "/chefs",
  userIsLoggedAndIsAdmin,
  multer.array("image", 1),
  ChefsController.put
);
routes.delete("/chefs", ChefsController.delete);

module.exports = routes;
