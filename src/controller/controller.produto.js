const modelProduto = require('../model/model.produto')

function Listar(req, res) {


    modelProduto.Listar(req.query.busca, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarId(req, res){    
    
    modelProduto.ListarId(req.params.id_produto, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

function ListarPorEvento(req, res){    
    
    modelProduto.ListarPorEvento(req.params.id_evento, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

function Cadastrar(req, res){
    modelProduto.Cadastrar(req.body, function(err, result){     
        
    const { descricao, preco_produto, cat_produto, id_evento } = req.body;

    // validations
    if (!descricao) {
        return res.status(422).json({ msg: "A descricao do produto é obrigatória!" });
    }

    if (!preco_produto) {
        return res.status(422).json({ msg: "O preco  é obrigatório!" });
    }
    if (!cat_produto) {
        return res.status(422).json({ msg: "A categoria  é obrigatória!" });
    }
    if (!id_evento) {
        return res.status(422).json({ msg: "O evento é obrigatório!" });
    }
        
        if (err) {
            res.status(500).send(err).json({msg:"Erro ao cadastrar:"+err});
            
        } else {
            res.status(201).json({msg:"Cadasro feito com sucesso!"});
        }      
    }); 
}

function Editar(req, res){           
    modelProduto.Editar(req.params.id_produto, req.body, function(err, result){     

        const { descricao, preco_produto, cat_produto, id_evento } = req.body;

        // validations
        if (!descricao) {
            return res.status(422).json({ msg: "A descricao do produto é obrigatória!" });
        }
    
        if (!preco_produto) {
            return res.status(422).json({ msg: "O preco  é obrigatório!" });
        }
        if (!cat_produto) {
            return res.status(422).json({ msg: "A categoria  é obrigatória!" });
        }
        if (!id_evento) {
            return res.status(422).json({ msg: "O evento é obrigatório!" });
        }
        
        if (err) {
            res.status(500).send(err).json("Erro ao alterar esse item!");
        } else {
            res.status(200).json("Alteração feita com sucesso!");
        }      
    });      
}

function Excluir(req, res){    
          
    modelProduto.Excluir(req.params.id_produto, function(err, result){            
        
        if (err) {
            res.status(500).send(err).json("Erro ao excluir!");
        } else {
            res.status(200).json("Item excluido com sucesso!");
        }      
    });      
}

module.exports = {Listar, ListarId, ListarPorEvento, Cadastrar, Editar, Excluir}
