const express = require("express");

const routes = express.Router();
const SessionController = require("../app/controllers/session");
const SessionValidators = require("../app/validators/session");

const { userIsLogged } = require("../app/middlewares/session");

routes.get("/login", userIsLogged, SessionController.loginRedirect);
routes.get("/forgot-password", userIsLogged,SessionController.forgotPassword);
routes.get("/forgot-password-form", userIsLogged,SessionController.forgotPasswordForm);

routes.post("/login", SessionValidators.login, SessionController.login);
routes.post("/logout", SessionController.logout);
routes.post("/forgot-password",SessionValidators.forgot, SessionController.forgot);
routes.post("/reset-password", SessionValidators.reset, SessionController.resetPassword);


// routes.post('/login', SessionController.post);
// routes.put('/login', SessionController.put);

module.exports = routes;
