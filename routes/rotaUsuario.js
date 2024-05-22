const express = require("express");
const router = express.Router();
const usuario=[{
    id:1,
    nome:"joao"
},
{
    id:2,
    nome:"pedro"
}]

router.get("/",(req,res,next)=>{
   res.send(
    {
        mensagem:"lista de usuarios",
        usuarios:usuario
    }
   )
})






module.exports = router;