const express  =  require('express') ; //Importando o PACOTE express
const cors  =  require('cors') ; //Importando o PACOTE express
const routes = require('./routes') ; // Importando o ARQUIVO routes

const app = express() ; //isntanciando em app

app.use(cors()) ; // Defini quem do FRONT pode acessar o backend, por enquanto ficam TODOS
app.use(express.json()) ; // Convertendo o objeto json em um objeto do tipo JS 
app.use(routes) ;


app.listen(3333) ; //ouvindo as requisições no navegador / escolhendo a porta da aplicação