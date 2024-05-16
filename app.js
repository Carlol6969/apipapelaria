const express = require("express")
const app = express();

app.use((req, res, next)=>{res.send("watashi no API desu")})
module.exports = app