// controller/apiKey.js
const modelApiKey = require('../model/model.apiKey');

async function criarChaveAPI(req, res) {
    const { nomeAplicacao } = req.body;
    

    try {
        await modelApiKey.criarChaveAPI(nomeAplicacao, function (err, result) {
            if (err) {
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }
            res.status(201).json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

async function validarChaveAPI(req, res) {
    const chaveAPI = req.headers['api-key'] || req.query.api_key;

    try {
        await modelApiKey.validarChaveAPI(chaveAPI, function (err, result) {
            if (err) {
                return res.status(401).json({ error: 'Chave de API inválida' });
            }
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

module.exports = { criarChaveAPI, validarChaveAPI };
