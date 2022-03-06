var express = require('express');
var app = express();

// Conhecer o console do Node
console.log("Hello World");

// Iniciar um servidor de Express funcional
app.get('/', (req, res) => {
    res.send("Hello Express");
}); 





























 module.exports = app;
