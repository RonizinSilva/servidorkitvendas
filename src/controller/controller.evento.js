const modelEvento = require('../model/model.evento')

function Listar(req, res) {


    modelEvento.Listar(req.query.busca, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarId(req, res){    
    
    modelEvento.ListarId(req.params.id_evento, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {                 
            res.status(Object.keys(result).length > 0 ? 200 : 404).json(result);            
        }      
    });      
}

function Cadastrar(req, res){
    modelEvento.Cadastrar(req.body, function(err, result){     
        
    const { nome, status } = req.body;

  // validations
  if (!nome) {
    return res.status(422).json({ msg: "O nome do evento é obrigatório!" });
  }

  if (!status) {
    return res.status(422).json({ msg: "O status é obrigatória!" });
  }
        
        if (err) {
            res.status(500).send(err).json({msg:"Erro ao cadastrar:"+err});
            
        } else {
            res.status(201).json({msg:"Cadasro feito com sucesso!"});
        }      
    }); 
}

function Editar(req, res){           
    modelEvento.Editar(req.params.id_evento, req.body, function(err, result){     
        
        const { nome, status } = req.body;

        // validations
        if (!nome) {
            
            return res.status(422).json({ msg: "O nome do evento é obrigatório!" });
        }

        if (!status) {
            return res.status(422).json({ msg: "O status é obrigatória!" });
        }
        
        if (err) {
            res.status(500).send(err).json("Erro ao alterar esse item!");
        } else {
            res.status(200).json("Alteração feita com sucesso!");
        }      
    });      
}

function Excluir(req, res){    
          
    modelEvento.Excluir(req.params.id_evento, function(err, result){            
        
        if (err) {
            res.status(500).send(err).json("Erro ao excluir!");
        } else {
            res.status(200).json("Item excluido com sucesso!");
        }      
    });      
}

module.exports = {Listar, ListarId, Cadastrar, Editar, Excluir}
