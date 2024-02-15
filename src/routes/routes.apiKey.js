// routes/apiKey.js
const { Router } = require('express');
const controllerApiKey = require('../controller/controller.apiKey');

const routeApiKey = Router();

routeApiKey.post('/api-key', controllerApiKey.criarChaveAPI);
routeApiKey.get('/api-key/validar', controllerApiKey.validarChaveAPI);

module.exports = routeApiKey;
