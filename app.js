const express = require("express")
const app = express();
const cep =[
  {
    "cep": "01001-001",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  }
]
const usuario=[
    {nome:"carlos", idade:"19", peso:"70"},
    {nome:"Pedro", idade:"30", peso:"100"},
    {nome:'Joao', idade:"40", peso:"60", cep:"77807060"},

]

app.use("/todos",(req, res, next)=>{res.send(usuario)})
app.use("/nome",(req, res, next)=>{res.send(usuario[1].nome)})
// // app.use("/cep/:valor",(req, res, next)=>{
// //   const valor=req.params.valor
//   res.send(valor)})
app.use("/soma",(req, res, next)=>{
    let total=0
    for(i=0; i<usuario.length; i++)
    {
      total=total+parseInt(usuario[i].idade)
    }

    res.send("Soma total: "+total);
})

app.use("/cep/:valor",(req, res, next)=>{
  const valor = req.params.valor
  const local = cep.filter(locais =>locais.cep === valor)

  res.send(local)
})
app.use("/viacep/:valor",(req, res, next)=>{
  const valor = req.params.valor
fetch("https://viacep.com.br/ws/"+valor+"/json/").then(resposta=>{local})

})
module.exports = app