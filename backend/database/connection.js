const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const Usuario = require('../app/usuario/model');


// INICIANDO CONEXÃO COM O BANCO 
const connection = new Sequelize(dbConfig);

// INICIALIZANDO OS MODELS 
Usuario.init(connection)




// INICIALIZANDO AS ASSOCIATION // AJUSTAR COM CONSIGN


module.exports = connection;