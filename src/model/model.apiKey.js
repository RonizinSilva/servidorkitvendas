// model/apiKey.js
const { db, executeQuery } = require('../../DB/DB');

async function criarChaveAPI(nomeAplicacao, callback) {

    function gerarChaveAPI() {
        const comprimentoChave = 32; // Escolha o comprimento desejado para sua chave
        const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        let chave = '';
        for (let i = 0; i < comprimentoChave; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
            chave += caracteresPermitidos.charAt(indiceAleatorio);
        }
    
        return chave;
    }
    const chaveAPI = gerarChaveAPI(); // Use a função de geração de chave que você implementou

    try {
        const ssql = "INSERT INTO api_keys(nome_aplicacao, chave_api) VALUES(?, ?)";
        const result = await executeQuery(db, ssql, [nomeAplicacao, chaveAPI]);

        callback(null, { id_chave: result.insertId, nome_aplicacao: nomeAplicacao, chave_api: chaveAPI });
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function validarChaveAPI(chaveAPI, callback) {
    try {
        const ssql = "SELECT * FROM api_keys WHERE chave_api = ?";
        const result = await executeQuery(db, ssql, [chaveAPI]);

        if (result.length > 0) {
            const chaveInfo = {
                id_chave: result[0].id_chave,
                nome_aplicacao: result[0].nome_aplicacao,
                chave_api: result[0].chave_api
            };
            callback(null, chaveInfo);
        } else {
            callback("Chave de API inválida", null);
        }
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

module.exports = { criarChaveAPI, validarChaveAPI };
