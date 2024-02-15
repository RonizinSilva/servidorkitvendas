const {Router} = require('express')
const controllerCategoria = require('../controller/controller.categoria.js')

const routeCategoria = Router();

routeCategoria.get("/categoria", controllerCategoria.Listar);
routeCategoria.post("/categoria", controllerCategoria.Cadastrar);
routeCategoria.get("/categoria/:id_categoria", controllerCategoria.ListarId);
routeCategoria.get("/categoria/evento/:id_evento", controllerCategoria.ListarPorEvento);
routeCategoria.put("/categoria/:id_categoria", controllerCategoria.Editar);
routeCategoria.delete("/categoria/:id_categoria", controllerCategoria.Excluir);

module.exports = routeCategoria;



