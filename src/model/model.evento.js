const {db, executeQuery} =require('../../DB/DB');

function Listar(busca, callback){

    let filtro = [];
    let ssql = "select id_evento, nome, status from evento";

    if (busca){
        ssql += "where nome like ?";
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

function ListarId(id_evento, callback){
    let ssql = "select id_evento, nome, status from evento where id_evento=?";
    
    db.query(ssql, [id_evento], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function Cadastrar(jsonEvento, callback){

    db.getConnection(function(err, conn){

        conn.beginTransaction(async function(err){

            try {

                // Evento...
                let ssql = "insert into evento(nome, status) ";
                ssql += "values(?, ?) ";

                await executeQuery(conn, ssql, [jsonEvento.nome, jsonEvento.status]);

                conn.commit();
                callback(undefined, {});

            } catch(e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        });

    });

}

function Editar(id_evento, jsonEvento, callback){
      
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {
                
                // Altera Pedido...
                let ssql = "update evento set  nome=?, status=? where id_evento = ?";

                await executeQuery(conn, ssql, [ jsonEvento.nome,  jsonEvento.status, id_evento]);
       
                
                conn.commit(); 
                callback(undefined, {});
                
            } catch (e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        }); 
    }); 
}

function Excluir(id_evento, callback){
    
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {                
                                                      
                // Evento...                
                ssql = "delete from evento where id_evento = ?";
                await executeQuery(conn, ssql, [id_evento]);
                

                conn.commit(); 
                callback(undefined, {});                                               
            
            } catch (e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        }); 
    });       
}

module.exports = {Listar, ListarId,  Cadastrar, Editar, Excluir}
