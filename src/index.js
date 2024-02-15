const express = require('express');
const routeEvento = require('./routes/route.evento');
const routeCategoria = require('./routes/route.categoria')
const routeProduto = require('./routes/route.produto')
const routeUsuario = require('./routes/route.usuario')
const routeApiKey = require('./routes/routes.apiKey')
const autenticacaoChave = require('../src/middleware/authMiddleware')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

// Rota pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a API do kit vendas' });
});

// Middleware de autenticação
app.use((req, res, next) => {
    autenticacaoChave(req, res, next, (error, mensagem) => {
        if (error) {
            return res.status(401).json({ error });
        }
        // console.log(mensagem);
        next();
    });
});

// Rotas autenticadas
app.use(routeApiKey);
app.use(routeEvento);
app.use(routeCategoria);
app.use(routeProduto);
app.use(routeUsuario);

app.listen(3001, function () {
    console.log("Servidor rodando na porta: 3001");
});
