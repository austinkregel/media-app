exports.up = async function(knex, Promise) {
    await knex.schema.createTable('file_genres', function(table) {
        table.charset('utf8');
        table.collate('utf8_unicode_ci');

        table.integer('genre_id').unsigned();
        table.integer('file_id').unsigned();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('file_genres');
};
