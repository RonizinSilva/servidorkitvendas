const modelCategoria = require('../model/model.categoria')

function Listar(req, res) {

    modelCategoria.Listar(req.query.busca, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarId(req, res){    
    
    modelCategoria.ListarId(req.params.id_categoria, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

function ListarPorEvento(req, res){    
    
    modelCategoria.ListarPorEvento(req.params.id_evento, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

function Cadastrar(req, res){
    modelCategoria.Cadastrar(req.body, function(err, result){  
        
        const { descricao, id_evento } = req.body;

        // validations
        if (!descricao) {
            return res.status(422).json({ msg: "A descricao é obrigatoria!" });
        }

        if (!id_evento) {
            return res.status(422).json({ msg: "O evento e orbigatorio!" });
        }
                
        if (err) {
            res.status(500).send(err).json({msg:"Erro ao cadastrar:"+err});
            
        } else {
            res.status(201).json({msg:"Cadasro feito com sucesso!"});
        }      
    }); 
}

function Editar(req, res){        
    modelCategoria.Editar(req.params.id_categoria, req.body, function(err, result){            
        const { descricao, id_evento } = req.body;

        // validations
        if (!descricao) {
            return res.status(422).json({ msg: "A descricao é obrigatoria!" });
        }

        if (!id_evento) {
            return res.status(422).json({ msg: "O evento e orbigatorio!" });
        }
        
        if (err) {
            res.status(500).send(err).json("Erro ao alterar esse item!");
        } else {
            res.status(200).json("Alteração feita com sucesso!");
        }      
    });      
}

function Excluir(req, res){    
          
    modelCategoria.Excluir(req.params.id_categoria, function(err, result){            
        
        if (err) {
            res.status(500).send(err).json("Erro ao excluir!");
        } else {
            res.status(200).json("Item excluido com sucesso!");
        }      
    });      
}

module.exports = {Listar, ListarId, ListarPorEvento, Cadastrar, Editar, Excluir}
