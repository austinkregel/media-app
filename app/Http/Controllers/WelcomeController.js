module.exports =  class WelcomeController {
    async index(req,res) {
        if (req.session.user) {
            return res.redirect('/home');   
        }

        return await app.view.render('welcome')
    }
};