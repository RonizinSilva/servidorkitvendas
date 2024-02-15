const {Router} = require('express')
const controllerEvento = require('../controller/controller.evento.js')

const routeEvento = Router();

routeEvento.get("/evento", controllerEvento.Listar);
routeEvento.get("/evento/:id_evento", controllerEvento.ListarId);
routeEvento.post("/evento", controllerEvento.Cadastrar);
routeEvento.put("/evento/:id_evento", controllerEvento.Editar);
routeEvento.delete("/evento/:id_evento", controllerEvento.Excluir);

module.exports = routeEvento;



