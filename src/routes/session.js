const express = require('express');

const routes = express.Router();
const SessionController = require('../app/controllers/session');
const SessionValidators = require('../app/validators/session');

routes.get('/login', SessionController.loginRedirect);
routes.get('/forgot-password', SessionController.forgotPassword);
routes.get('/forgot-password-form', SessionController.forgotPasswordForm);

routes.post('/login', SessionValidators.login, SessionController.login);
routes.post('/forgot-password', SessionController.login);
routes.post('/logout', SessionController.logout);
// routes.post('/login', SessionController.post);
// routes.put('/login', SessionController.put);



module.exports = routes;