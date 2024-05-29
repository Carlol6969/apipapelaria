const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
        entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            idproduto integer, 
            qntde integer, 
            valorunit real,
            data date      )
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todas as entradas",
            produtos: rows
        });
    });
})

//consultar apenas produt pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro do Entrada",
            produto: rows
        });
    });
})

// aqui salvamos dados do produto
router.post("/",(req,res,next)=>{
const {idproduto,qntde,valorunit,data} = req.body;
db.serialize(()=>{ 
    const insertEntrada = db.prepare(`
    INSERT INTO entrada(idproduto,qntde,valorunit,data)VALUES(?,?,?,?)`);
    insertEntrada.run(idproduto,qntde,valorunit,data)
    insertEntrada.finalize()

});
process.on("SIGINT", ()=>{
    db.close((err)=>{
        if (err){
            return res.status(304).send(err.message);
        }
    });
});
  res.status(200)
  .send({mensagem:"Entrada salva com sucesso"
});
});

// aqui podemos alterar dados do produto
router.put("/",(req,res,next)=>{
    const {id,idproduto,qntde,valorunit,data} = req.body;
    db.run('UPDATE entrada SET idproduto=?,qntde=?,valorunit=?,data=? where id=?',[idproduto,qntde,valorunit,data,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Entrada de id:${id} foi alterado com sucesso`,
        });
    });
        

});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Entrada de id:${id} deletado com sucesso`,
        });
    });
        
    

   
});
module.exports = router;