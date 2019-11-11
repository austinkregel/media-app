exports.up = async function(knex, Promise) {
    await knex.schema.table('files', function(table) {
        table.string('normalized_name').nullable().index();
        table.string('rating').nullable().index();
        table.string('genre').nullable().index();
        table.string('plot').nullable().index();
        table.string('poster').nullable().index();
        table.string('imdbRating').nullable().index();
        table.string('runtime').nullable().index();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.table('files', (table) => {
        table.dropColumn('normalized_name');
        table.dropColumn('rating');
        table.dropColumn('genre');
        table.dropColumn('plot');
        table.dropColumn('poster');
        table.dropColumn('imdbRating');
        table.dropColumn('runtime');
    });
};
