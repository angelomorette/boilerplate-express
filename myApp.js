var express = require('express');
var app = express();

// Conhecer o console do Node
console.log("Hello World");

/* 
    //carregar os arquivos que estão no diretório public
        app.use(express.static('public'));
        app.use(express.static(__dirname + '/public'));
        http://localhost:3000/style.css -- retorna o arquivo

    //como tem uma referencia no index.html para /public/style.css
        app.use('/public', ....) -- cria um caminho virtual 
        http://localhost:3000/public/style.css
 */
// Servir ativos estáticos
app.use('/public', express.static(__dirname + '/public'));

/*
 // Iniciar um servidor de Express funcional
app.get('/', (req, res) => {
    res.send("Hello Express");
});
*/ 

// Servir um arquivo HTML
const absolutePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});







 

















 module.exports = app;
