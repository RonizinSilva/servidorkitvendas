const { Router } = require('express');
const controllerUsuario = require('../controller/controller.usuario.js');
const jwt = require('jsonwebtoken');


const routeUsuario = Router();

routeUsuario.get('/usuario', controllerUsuario.Listar);
routeUsuario.get('/usuario/:id_usuario', controllerUsuario.ListarId);
routeUsuario.post("/auth/register",  controllerUsuario.Cadastrar);
routeUsuario.post('/auth/login', controllerUsuario.Login);
// Rota para redefinição de senha
routeUsuario.post('/auth/reset-password', controllerUsuario.RedefinirSenha);

// Rota para alteração de senha com token
routeUsuario.post('/auth/change-password', controllerUsuario.AlterarSenhaComToken);

routeUsuario.get('/auth/validar-token', controllerUsuario.ValidarToken);

module.exports = routeUsuario;
