
exports.up = function(knex) { // método UP é responsavel pela criação da tabela
    //Criando nova tabela
    return knex.schema.createTable('ongs', function(table){
        //Definindo os campos
        table.string('id').primary() ;
        table.string('name').notNullable() ;
        table.string('email').notNullable() ;
        table.string('whatsapp').notNullable() ;
        table.string('city').notNullable() ;
        table.string('uf',2).notNullable() ; //passando por padrão o numero maximo 
    });
};

//Método responsave por desfazer algo nete caso a tabela inteira
exports.down = function(knex) {
    return knex.schema.dropTable('ongs') ;
};
