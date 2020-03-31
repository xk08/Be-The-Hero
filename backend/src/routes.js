const express = require('express') ; // Importando o PACOTE express

const OngController = require('./controllers/OngController') ; 

const IncidentController = require('./controllers/IncidentController') ; 

const ProfileController = require('./controllers/ProfileController') ; 

const SessionController = require('./controllers/SessionController') ; 

const routes = express.Router() ; 


/**
 * EXPLICANDO ALGUNS CONCEITOS BÁSICOS
 * 
 * Métodos HTTP:
 * GET: Busca/Listar uma inforação do back-end
 * POST: Cria uma informação no back-end
 * PUT: Altera uma Informação no back-end
 * DELETE: Deleta a informação do back-end

 * Tipos de parametros
 * 
 * Query Params: Parametros nomeados enviados na rota após o "?" servindo pra Filtros, Paginação
 * Route Params: Parametros para identificar recursos ->  utilização /:
 * Request Body: Copro da requisição utilizado para criar ou alterar recursos
 *
  * BASES DE DADOS
  * SQL: MySQL, SQLite, PostGres
  * NoS: MongoDB, CouchDB, Firebase
  */

//ROTAS DE LOGIN E LOGOUTS
routes.post('/sessions', SessionController.create);

// ROTAS RELATIVAS A 'ONG'
routes.get('/ongs', OngController.index) ; 
routes.post('/ongs', OngController.create) ; 

//ROTAS RELATIVAS AO PROFILLE DA ONG ( o que é especifico )
routes.get('/profile', ProfileController.index);

//ROTAS RELATIVAS AOS 'INCIDENTS/CASOS'
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);

/**
 * PAREI EM 1:18:00 onde vai listar os casos espcificos e uma ong
 */

module.exports = routes ; //Exportando a variavel e dentro do arquivo
