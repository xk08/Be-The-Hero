/**
 * Exporta os principais métodos 
 */
const connection = require('../database/connection') ; //Importando o método de conexão
const crypto = require('crypto') ;


module.exports = {

    //Criando Método de listar as ongs
    async index (request, reponse){
        const ongs = await connection('ongs').select('*') ; //Seleciona todos os valores na tabela ongs
        return reponse.json(ongs);
    },
    
    //Método de criar uma nova ONG
    async create(request, reponse ) {
        const {name, email, whatsapp, city, uf} = request.body ; 
        const id  = crypto.randomBytes(4).toString('HEX') ;  //Converte 4 bytes de caracteres hexadecial em string e salva em ID
    
        //apos aberta a conexão, faz a inserção na tabela escolhida nos campos setados a baixo
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return reponse.json({id}) ; 
    }
};