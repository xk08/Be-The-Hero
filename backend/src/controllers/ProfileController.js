/**
 * Vai guardar coisas relacionadas ao perfil da ONG em si 
 */
const connection = require('../database/connection') ; 

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization ; // Pega o id da ong que ta logada

        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*')

        return response.json(incidents);
    }
}