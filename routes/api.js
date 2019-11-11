let User = require(app.base_path('app/User'));

module.exports = (router) => {
    router.express.get('/api/users', app.make('middleware.auth'), async (req, res) => {
        res.send(await User.all())
    })

    router.get('/api/files', app.controller('Api/FileController', 'index'));
    router.get('/api/media/:id', app.controller('HomeController', 'show'))
}