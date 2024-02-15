const { db, executeQuery } = require('../../DB/DB');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

async function EnviarEmailAlteracaoSenha(email, token) {
    // Configuração do serviço de e-mail (exemplo usando nodemailer)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ronisilva.pro@gmail.com',
            pass: 'sucu flcp plxz wdfu'
        }
    });

    // Configurações do e-mail
    const mailOptions = {
        from: 'ronisilva.pro@gmail.com',
        to: email,
        subject: 'Redefinição de Senha',
        text: `Clique no link a seguir para redefinir sua senha: http://localhost:3000/redefinir-senha/${token}`
    };

    // Envio do e-mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}

async function GerarTokenRedefinicaoSenha(email) {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const ssql = "UPDATE usuario SET token_reset_senha = ?, data_expiracao_token = ADDTIME(NOW(), '1:0:0') WHERE email = ?";
    await executeQuery(db, ssql, [token, email]);

    return token;
}

async function AlterarSenhaComToken(email, token, novaSenha, callback) {
    const ssql = "SELECT * FROM usuario WHERE email = ? AND token_reset_senha = ? AND data_expiracao_token > NOW()";
    const result = await executeQuery(db, ssql, [email, token]);

    if (result.length === 0) {
        return callback("Token inválido ou expirado", null);
    }

    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    const updateSql = "UPDATE usuario SET senha = ?, token_reset_senha = NULL, data_expiracao_token = NULL WHERE email = ?";
    await executeQuery(db, updateSql, [hashedPassword, email]);
    
    callback(null, {});
}

module.exports = { EnviarEmailAlteracaoSenha, GerarTokenRedefinicaoSenha, AlterarSenhaComToken };
