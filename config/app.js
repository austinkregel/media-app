const path = require('path');

module.exports = {
    url: process.env.APP_URL || 'localhost:3000',
    url_schema: process.env.APP_SCHEMA || 'http://',
    providers: [
        path.join(__dirname, '..', '/app/Providers/RouteServiceProvider.js'),
    ],
    name: 'Project'
}