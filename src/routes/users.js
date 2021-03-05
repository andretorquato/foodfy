const express = require("express");

const routes = express.Router();

const UsersController = require("../app/controllers/users");
const UserValidator = require("../app/validators/users");
const { userIsNotLogged } = require("../app/middlewares/session");

routes.get("/users", userIsNotLogged, UsersController.index);
routes.get("/users/create", userIsNotLogged, UsersController.create);
routes.get("/users/:id/profile", userIsNotLogged, UsersController.profile);
routes.get("/users/:id/edit", userIsNotLogged, UsersController.edit);
routes.post("/users", UserValidator.post, UsersController.post);
routes.put("/users", UserValidator.update, UsersController.update);
routes.delete("/users", UsersController.delete);

module.exports = routes;
