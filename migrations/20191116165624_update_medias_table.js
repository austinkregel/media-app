exports.up = async function(knex, Promise) {
    await knex.schema.createTable('media_genres', function(table) {
        table.charset('utf8');
        table.collate('utf8_unicode_ci');

        table.integer('genre_id').unsigned();
        table.integer('media_id').unsigned();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('media_genres');
};
