const express = require('express');

const routes = express.Router();
const SessionController = require('../app/controllers/session');

routes.get('/login', SessionController.loginRedirect);
routes.get('/forgot-password', SessionController.forgotPassword);
routes.get('/forgot-password-form', SessionController.forgotPasswordForm);
routes.post('/forgot-password', SessionController.login);
routes.post('/login', SessionController.login);

// routes.post('/login', SessionController.post);
// routes.put('/login', SessionController.put);



module.exports = routes;