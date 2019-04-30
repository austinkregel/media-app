exports.up = async function(knex, Promise) {
    await knex.schema.createTable('files', function(table) {
        table.charset('utf8');
        table.collate('utf8_unicode_ci');

        // User data.
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();

        table.string('mime_type').nullable().index();
        table.string('file_path').nullable().index();
        table.string('should_convert').nullable();
        table.dateTime('converted_at').nullable();

        table.string('size').nullable().index();
        table.string('bytes').nullable().index();
        table.string('hash').nullable().index();
        // type is video, image, text, ect.
        table.string('type').nullable().index();

        table.text('extra').nullable();

        // Timestamps.
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now()).index();
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('files');
};
