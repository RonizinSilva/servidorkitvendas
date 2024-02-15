const { db, executeQuery } = require('../../DB/DB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function EmailExistente(email, conn) {
    const ssql = "SELECT COUNT(*) AS count FROM usuario WHERE email = ?";
    const result = await executeQuery(conn, ssql, [email]);
    return result[0].count > 0;
}

function Listar(busca, callback){
    let filtro = [];
    let ssql = "select u.id_usuario, u.email, u.nome, u.id_evento, e.nome as 'evento', tipo_usuario  from usuario u, evento e where u.id_evento = e.id_evento";

    if (busca){
        ssql += "where u.nome like ?";
        filtro.push('%' + busca + '%');
    }

    db.query(ssql, filtro, function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
}

function ListarId(id_usuario, callback){
    let ssql = "select u.id_usuario, u.email, u.nome, u.id_evento, e.nome as 'evento', tipo_usuario  from usuario u, evento e where u.id_evento = e.id_evento and id_usuario=?";
    
    db.query(ssql, [id_usuario], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function Cadastrar(jsonUsuario, callback) {
    db.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        conn.beginTransaction(async function (err) {
            try {
                // Verifica se o email já existe
                if (await EmailExistente(jsonUsuario.email, conn)) {
                    callback("E-mail já cadastrado", null);
                    return;
                }

                // Hash da senha antes de armazenar no banco de dados
                const hashedPassword = await bcrypt.hash(jsonUsuario.senha, 10);

                // Inserção no banco de dados com a senha hash
                let ssql = "INSERT INTO usuario(email, senha, nome, id_evento, tipo_usuario) ";
                ssql += "VALUES(?, ?, ?, ?, ?) ";

                await executeQuery(conn, ssql, [jsonUsuario.email, hashedPassword, jsonUsuario.nome, jsonUsuario.id_evento, jsonUsuario.tipoUsuario]);

                conn.commit();
                callback(null, {});
            } catch (e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            } finally {
                conn.release();
            }
        });
    });
}

function Login(email, senha, callback) {
    db.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        conn.beginTransaction(async function (err) {
            try {
                // Busca o usuário pelo email
                let ssql = "select * from usuario where email = ?";
                const result = await executeQuery(conn, ssql, [email]);

                if (result.length === 0) {
                    callback("Usuário não encontrado", null);
                    return;
                }

                const user = await result[0];
                if(user){
                    console.log(user)
                }

                // Verifica a senha
                const passwordMatch = await bcrypt.compare(senha, user.senha);

                if (!passwordMatch) {
                    callback("Credenciais inválidas", null);
                    return;
                }

                // Gera o token
                const token = jwt.sign({ id: user.id_usuario, email: user.email, nome:user.nome, id_evento: user.id_evento, tipo_usuario: user.tipo_usuario }, 'secretpassword', { expiresIn: '1h' });
                const usuario = {
                    id: user.id_usuario, 
                    email: user.email,
                    nome: user.nome,
                    id_evento: user.id_evento,
                    tipo_usuario: user.tipo_usuario
                }
                callback(null, { token, usuario });
                return token, usuario;
                
            } catch (e) {
                console.log(e);
                callback(e, null);
            } finally {
                conn.release();
            }
        });
    });
}

module.exports = { Listar, ListarId, Cadastrar, Login };
