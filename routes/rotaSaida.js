const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
        saida (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            idproduto integer, 
            qntde integer, 
            valorunit real,
            datasaida date      )
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM saida', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todas as saídas",
            produtos: rows
        });
    });
})

//consultar apenas produt pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM saida', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da Saída",
            produto: rows
        });
    });
})

// aqui salvamos dados do produto
router.post("/",(req,res,next)=>{
const {idproduto,qntde,valorunit,datasaida} = req.body;
db.serialize(()=>{ 
    const insertSaida = db.prepare(`
    INSERT INTO saida(idproduto,qntde,valorunit,datasaida)VALUES(?,?,?,?)`);
    insertSaida.run(idproduto,qntde,valorunit,datasaida)
    insertSaida.finalize()

});
process.on("SIGINT", ()=>{
    db.close((err)=>{
        if (err){
            return res.status(304).send(err.message);
        }
    });
});
  res.status(200)
  .send({mensagem:"Saída salva com sucesso"
});
});

// aqui podemos alterar dados do produto
router.put("/",(req,res,next)=>{
    const {id,idproduto,qntde,valorunit,datasaida} = req.body;
    db.run('UPDATE saida SET idproduto=?,qntde=?,valorunit=?,datasaida=? where id=?',[idproduto,qntde,valorunit,datasaida,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Saída de id:${id} foi alterado com sucesso`,
        });
    });
        

});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM saida where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Saída de id:${id} deletado com sucesso`,
        });
    });
        
    

   
});
module.exports = router;