const knex = require('knex') ; //importando o knex
const configuration = require('../../knexfile') ; 

const connection = knex(configuration.development) ; //escolhendo a configuração do tipo desenvolvedor

//Exportando a conexão com o banco para os outros arquivos precisarem
module.exports = connection ; 