const modelUsuario = require('../model/model.usuario');
const modelAlterarSenha = require('../model/model.alterarSenha')
const jwt = require('jsonwebtoken');

function ValidarToken(req, res) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'secretpassword', (err, decoded) => {
    if (err) {
       
      return res.status(401).json({ message: 'Falha na autenticação do token' });
      
    }

    // Token válido, você pode retornar qualquer informação adicional se necessário
    res.status(200).json({ message: 'Token válido', decoded });
    
  });
}


function Listar(req, res) {
    modelUsuario.Listar(req.query.busca, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarId(req, res){    
    
    modelUsuario.ListarId(req.params.id_usuario, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

async function Cadastrar(req, res) {
    try {
        await modelUsuario.Cadastrar(req.body, function (err, result) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

async function Login(req, res) {
    const { email, senha } = req.body;

    try {
        await modelUsuario.Login(email, senha, function (err, result) {
            if (err) {
                return res.status(401).json({ error: err });
            }
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

//Vai receber o email pra envio, se constar no banco, envia o token
async function RedefinirSenha(req, res) {
    const { email } = req.body;

    try {
        const token = await modelAlterarSenha.GerarTokenRedefinicaoSenha(email);
        await modelAlterarSenha.EnviarEmailAlteracaoSenha(email, token);

        res.json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

//Com o token, é possivel fazer a requisição pra definir uma nova senha
async function AlterarSenhaComToken(req, res) {
    const { email, token, novaSenha } = req.body;

    try {
        await modelAlterarSenha.AlterarSenhaComToken(email, token, novaSenha, function (err, result) {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.json({ message: 'Senha alterada com sucesso' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}



module.exports = { Listar, ListarId, Cadastrar, Login, AlterarSenhaComToken, RedefinirSenha, ValidarToken };
