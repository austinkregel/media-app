let Application = require('forge-cli');
let knexfile = require('./knexfile')
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-eloquent'));

app.shelf = bookshelf

Application.register(__dirname, [
    // You can register either a whole directory or a single command, or both!
    'app/Commands'
]);

let args = Object.assign({}, { args: process.argv });
// This "starts" the application
Application.start(args);
