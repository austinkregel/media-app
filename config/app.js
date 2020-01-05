module.exports = {
    url: process.env.APP_URL || 'localhost:3000',
    url_schema: process.env.APP_SCHEMA || 'http://',
    providers: [
        app.base_path('app/Providers/RouteServiceProvider.js'),
        app.base_path('app/Providers/QueueServiceProvider.js'),
    ],
    name: 'Project'
}