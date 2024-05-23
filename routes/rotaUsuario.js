const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS
usuario(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
         )`,
(createTableError) => {
    if(createTableError){
        return res.status(500).send({error:createTableError.message})
    }
}
);
const usuario=[{
    id:1,
    nome:"joao"
},
{
    id:2,
    nome:"pedro"
}]

router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM usuario', (error,rows) => {
        if(error){
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send({
            mensagem: "aqui estao todos os usuarios",
            usuarios: row
        });
    });
  
});






module.exports = router;