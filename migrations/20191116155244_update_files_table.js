exports.up = async function(knex, Promise) {
    await knex.schema.table('files', function(table) {
        table.integer('media_id').nullable().unsigned().index();
    });
};

exports.down = async function(knex, Promise) {
    return knex.schema.table('files', function(t) {
        t.dropColumn('media_id');
    });
};
