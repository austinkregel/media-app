module.exports =  class WelcomeController {
    async index(req,res) {
        return await app.view.render('welcome')
    }
};