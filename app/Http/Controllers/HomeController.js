module.exports = class HomeController {
    async index(req, res) {
        return await app.view.render('home')
    }

    async spaRoute(req, res) {
        return await app.view.render('spa')
    }

    async player(req, res) {
        const File = app.require('app/File');

        const file = await File.query().findById(req.params.id);

        return await app.view.render('player', {
            file: JSON.stringify(file)
        })
    }
}