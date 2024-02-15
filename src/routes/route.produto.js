const {Router} = require('express')
const controllerProduto = require('../controller/controller.produto.js')

const routeProduto = Router();

routeProduto.get("/produto", controllerProduto.Listar);
routeProduto.get("/produto/:id_produto", controllerProduto.ListarId);
routeProduto.get("/produto/evento/:id_evento", controllerProduto.ListarPorEvento);
routeProduto.post("/produto", controllerProduto.Cadastrar);
routeProduto.put("/produto/:id_produto", controllerProduto.Editar);
routeProduto.delete("/produto/:id_produto", controllerProduto.Excluir);

module.exports = routeProduto;



