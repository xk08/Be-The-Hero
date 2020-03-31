exports.up = function(knex) {
    //Criando nova tabela
    return knex.schema.createTable('incidents', function(table){
        
        //Definindo os campos
        table.increments(); //Gerando um identiicador do tipo auto_incremet
        table.string('title').notNullable() ;
        table.string('description').notNullable() ;
        table.decimal('value').notNullable() ; //decimal == float

        table.string('ong_id').notNullable() ; //Criando o campo para pegar o id da ong 
        
        //Referenciando a chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs') ; 
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('incidents') ; 
};
