var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');

// middleware para manipular dados urlencoded 
//Ao usar extended=false, os valores podem ser apenas strings ou arrays. 
//false - biblioteca  querystring.  
//true - biblioteca qs
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Middleware ao nível de root
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// Encadear middleware para criar um servidor de tempo
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        "time": req.time
    })
});

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

// API simples 
// Usando arquivo .env
app.get('/json', (req, res) => {
    
    // process.env.NOMEVAL -- variavel global do node usada para acessar as vaiaveis em .env 
    if (process.env.MESSAGE_STYLE == 'uppercase'){
        res.json({
            "message": "HELLO JSON"
        });
    } else {
        res.json({
            "message": "Hello json"
        });
    }
});

// Obter a entrada do parâmetro de roteamento do client
app.get('/:word/echo', (req, res) => {
    const word = req.params.word
    res.json({
        "echo": word
    });
});

// Obter a entrada do parâmetro da consulta do client
 app.get('/name', (req, res) => {
    const firtname = req.query.first;
    const lastname = req.query.last;

    res.json({
        "name": `${firtname} ${lastname}`
    });
 });

// Usar o body-parser para analisar solicitações de POST
/* app.post('/name', (req, res) => {
    const name = req.body;
    res.json({
        "first": name.first,
        "last": name.last
    });
}) */;


// Obter dados de solicitações de POST
app.post('/name', (req, res) => {
    const name = req.body;
    res.json({
        "name": `${name.first} ${name.last}`
    });
})










 module.exports = app;
