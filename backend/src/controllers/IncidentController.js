const connection = require('../database/connection') ; //pegando a conexão

module.exports = {

    //Método de listagem
    async index(request, response) {
        //Criando mecanismo para a PAGINAÇÃO dos resultados, para exibir todos de uma vez por exemplo
        const { page = 1 } = request.query ; 

        const [count] = await connection('incidents').count() ; //pegando o numero total de registros
         
        const incidents = await connection('incidents')
        //Fazendo uma consulta dupla com o JOIN
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // testa na tabela ongs se o id é o mesmo
        .limit(5)  //limitando o numero de registros por vez
        .offset((page -1 ) * 5 )  /** Pula os registros -> neste caso, pega o numero de paginas e diminui da atual para exibir todos os 5 */
        .select([ //Faz um select duplo, ond dos incidentes pega tudo e da ong determina os campos que quer pegar
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]) ; 

        //Enviando o numero total de registro pro cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']) ; 

        return response.json(incidents) ; 
    },
    
    //Método de criação 
    async create(request, response) {
        const {title, description, value } = request.body;

        const ong_id = request.headers.authorization ; // pegando o id do cabeçalho da requisição

        /**
         * pega o primeiro registro para ser o ID, abre a conexão e insere os valores na tabela incidents
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json( {id} ); // retornao id da tabel incidens
    },

    //Criando método para apagar
    async delete(request, response){
        const { id } = request.params ; //Pega o id do parametro de rota
        const ong_id = request.headers.authorization ; // PEga o id da ong logada

        //Buscando os incidents
        const incident = await connection('incidents')
        .where('id', id) //procurando especifico
        .select('ong_id') //De todo o resultado, pega apenas o a coluna 'ong_id'
        .first() ; //pega apenas o primeiro registro (neste caso , sempre vai ter apenas 1 gravado)

        /**
         * Realiza o teste pra ver se o caso possui mesmo o id da ong, se sim ele pode ser apagado, senão 
         * uma mensagem de erro é envida
         */
        if (incident.ong_id != ong_id) { // se o incident ong_id for diferente do que ta logado, apresenta o erro
            return response.status(401).json({
                error: 'Operação Não Permitida'
            }) ; 
        }

        //Caso tenha dado certo, tenha passado do teste
        await connection('incidents').where('id',id).delete() ; 

        return response.status(204).send() ; 
    }
};
