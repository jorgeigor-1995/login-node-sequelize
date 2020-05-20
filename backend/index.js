var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
const connection = require('./database/connection');

//var path = require('path');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

connection
    .authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados');
    })
    .catch(err => {
        console.log('erro ao conectar ao banco', err)
    })

app.get('/api/', function (req, res, next) {
    res.json('online');
});

var config = require('./config');

/*Login de Usuarios*/
app.use('/api/', require('./app/usuario/auth'));

/*Mid para rotas da API verificar JWT*/
var jwt = require('./core/jwt');
app.use('/api/v1', jwt);

/*Modulos*/
jwt.use('/usuarios', require('./app/usuario'));


var port = parseInt(config.initialPort);

server.listen(port, '127.0.0.1');
console.log('Server start: ' + port);
