const {db, executeQuery} =require('../../DB/DB');

function Listar(busca, callback){

    let filtro = [];
    let ssql = "select id_categoria, descricao, id_evento from categoria";

    if (busca){
        ssql += "where descricao like ?";
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

function ListarId(id_categoria, callback){
    let ssql = "select id_categoria, descricao, id_evento from categoria where id_categoria=?";
    
    db.query(ssql, [id_categoria], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function ListarPorEvento(id_evento, callback){
    let ssql = "select * from categoria c where c.id_evento=? ";
    
    db.query(ssql, [id_evento], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function Cadastrar(jsonCategoria, callback){

    db.getConnection(function(err, conn){

        conn.beginTransaction(async function(err){

            try {

                // categoria...
                let ssql = "insert into categoria(descricao, id_evento) ";
                ssql += "values(?, ?) ";

                await executeQuery(conn, ssql, [jsonCategoria.descricao, jsonCategoria.id_evento]);

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

function Editar(id_categoria, jsonCategoria, callback){
      
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {
                
                // Altera Pedido...
                let ssql = "update categoria set  descricao=?, id_evento=? where id_categoria = ?";

                await executeQuery(conn, ssql, [ jsonCategoria.descricao,  jsonCategoria.id_evento, id_categoria]);
       
                
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

function Excluir(id_categoria, callback){
    
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {                
                                                      
                // categoria...                
                ssql = "delete from categoria where id_categoria = ?";
                await executeQuery(conn, ssql, [id_categoria]);
                

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

module.exports = {Listar, ListarId, ListarPorEvento,  Cadastrar, Editar, Excluir}
