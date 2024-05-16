const express = require("express")
const app = express();
const usuario=[
    {nome:"carlos", idade:"19", peso:"70"},
    {nome:"Pedro", idade:"30", peso:"100"},
    {nome:'Joao', idade:"40", peso:"60", cep:"77807060"},

]

app.use("/todos",(req, res, next)=>{res.send(usuario)})
app.use("/nome",(req, res, next)=>{res.send(usuario[1].nome)})
app.use("/cep",(req, res, next)=>{res.send(usuario[2].cep)})
app.use("/soma",(req, res, next)=>{
    let total=0
    for(i=0; i<usuario.length; i++)
    {
      total=total+parseInt(usuario[i].idade)
    }

    res.send("Soma total: "+total);
})
module.exports = app