const express = require("express");

const routes = express.Router();

const UsersController = require("../app/controllers/users");
const UserValidator = require("../app/validators/users");
const {
  userIsNotLogged,
  userIsLoggedAndIsAdmin,
  userProfileAccess
} = require("../app/middlewares/session");

routes.get("/users", userIsNotLogged, UsersController.index);
routes.get("/users/create", userIsNotLogged, UsersController.create);
routes.get("/users/:id/profile", userProfileAccess, UsersController.profile);
routes.get("/users/:id/edit", userIsNotLogged, UsersController.edit);
routes.post("/users", UserValidator.post, UsersController.post);
routes.put(
  "/users",
  userIsLoggedAndIsAdmin,
  UserValidator.update,
  UsersController.update
);
routes.put(
  "/user-create-password",
  UserValidator.userCreatePassword,
  UsersController.createPassword
);
routes.delete("/users", UsersController.delete);

module.exports = routes;
