const express = require('express');

const routes = express.Router();
const SessionController = require('../app/controllers/session');

routes.get('/login', SessionController.login);
routes.get('/forgot-password', SessionController.forgotPassword);
routes.get('/forgot-password-form', SessionController.forgotPasswordForm);

// routes.post('/login', SessionController.post);
// routes.put('/login', SessionController.put);



module.exports = routes;