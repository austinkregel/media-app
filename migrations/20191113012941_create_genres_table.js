exports.up = async function(knex, Promise) {
    await knex.schema.createTable('genres', function(table) {
        table.charset('utf8');
        table.collate('utf8_unicode_ci');

        table.integer('id').unsigned();
        table.string('name');
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('genres');
};
