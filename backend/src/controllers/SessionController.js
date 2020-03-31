const connection = require('../database/connection') ; 

/**
 * AQUI SERÁ FEITO SE A ONG EXISTE NO BANCO DE DADOS, ESTA É A VALIDAÇÃO DO 'LOGIN'
 */

module.exports = {
    async create(request, response) {
        const { id } = request.body ; // pega o id da ong que ta utilizando no momento

        //pega o nome da ong no banco
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first() ; 

        //Se o nome for diferente, apresenta erro e não envia
        if (!ong) {
            return response.status(400).json({
                error: 'Nenhuma ONG encontrada neste ID'
            }) ; 
        }

        //Se for igual, retorna o nome da ong
        return response.json(ong) ;
        
        } 
}