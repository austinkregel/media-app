exports.up = async function(knex, Promise) {
    await knex.schema.createTable('medias', function(table) {
        table.charset('utf8');
        table.collate('utf8_unicode_ci');

        table.increments('id').unsigned().primary();
        table.string('name').index();
        table.string('rating').nullable().index();
        table.text('plot').nullable();
        table.string('poster').nullable();
        table.string('backdrop').nullable();
        table.string('runtime').nullable();
        table.string('popularity').nullable()
        table.dateTime('release_date').nullable().index();
        table.string('revenue').nullable();
        table.string('tagline').nullable().index();

        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now()).index();
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('medias');
};
