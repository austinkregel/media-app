const { join } = require('path');

module.exports = {
    url: process.env.APP_URL || 'localhost:3000',
    url_schema: process.env.APP_SCHEMA || 'http://',
    providers: [
        join(__dirname, '..', '/app/Providers/RouteServiceProvider.js'),
    ],
    name: 'Project'
}