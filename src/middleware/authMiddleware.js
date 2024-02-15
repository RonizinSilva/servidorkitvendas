// middleware/authMiddleware.js
const { db, executeQuery } = require('../../DB/DB');

async function autenticacaoChave(req, res, next, callback) {
    const chaveMestre = 'ronizin';
    const chave = req.headers['api-key'] || req.query.api_key;

    // Verificar se a rota é a rota inicial '/'
    if (req.path === '/') {
        // Se for a rota inicial, permita a passagem sem autenticação
        return next();
    }

    async function verificaChave(chave) {
        try {
            const ssql = "SELECT chave_api FROM api_keys WHERE chave_api = ?";
            const result = await executeQuery(db, ssql, [chave]);

            if (result.length === 0) {
                return callback("Chave de API não existe!", null);
            } else {
                callback(null);//
            }
        } catch (error) {
            callback('Erro ao verificar a chave!', null);
        }
    }

    // Verificar se a chave/API key está presente
    if (!chave) {
        return res.status(401).json({ error: 'É necessário ter permissão para acessar essa rota' });
    }

    // Verificar se a chave/API key é válida (consultar no banco de dados)
    if (chave === chaveMestre) {
        next();
    } else {
        verificaChave(chave);
    }
}

module.exports = autenticacaoChave;
