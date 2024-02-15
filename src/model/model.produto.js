const {db, executeQuery} =require('../../DB/DB');

function Listar(busca, callback){

    let filtro = [];
    let ssql = "select * from produto";

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

function ListarId(id_produto, callback){
    let ssql = "select descricao, preco_produto, cat_produto, id_evento from produto where id_produto=?";
    
    db.query(ssql, [id_produto], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function ListarPorEvento(id_evento, callback){
    let ssql = "select * from produto p where p.id_evento=? ";
    
    db.query(ssql, [id_evento], function(err, result){
        if (err) {
            callback(err, []);
        } else {                        
            callback(undefined, {result});
        }
    });
}

function Cadastrar(jsonProduto, callback){

    db.getConnection(function(err, conn){

        conn.beginTransaction(async function(err){

            try {

                // produto...
                let ssql = "insert into produto(descricao, preco_produto, cat_produto, id_evento) ";
                ssql += "values(?, ?, ?, ?) ";

                await executeQuery(conn, ssql, [jsonProduto.descricao, jsonProduto.preco_produto, jsonProduto.cat_produto, jsonProduto.id_evento]);

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

function Editar(id_produto, jsonProduto, callback){
      
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {
                
                // Altera Pedido...
                let ssql = "update produto set  descricao=?, preco_produto=?, cat_produto=?, id_evento=? where id_produto = ?";

                await executeQuery(conn, ssql, [jsonProduto.descricao, jsonProduto.preco_produto, jsonProduto.cat_produto, jsonProduto.id_evento, id_produto]);
       
                
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

function Excluir(id_produto, callback){
    
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {                
                                                      
                // produto...                
                ssql = "delete from produto where id_produto = ?";
                await executeQuery(conn, ssql, [id_produto]);
                

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
