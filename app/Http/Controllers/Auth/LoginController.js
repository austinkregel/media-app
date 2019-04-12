const User = app.make(app.base_path('app/User'));
const bcrypt = app.make('bcrypt');

module.exports = class LoginController {
    index(req) {
        console.log(req.session)
        return app.view.render('auth.login', {
            csrf: req.csrfToken()
        })
    }

    async store(request, response) {
        let validator = app.make('validator')

        const data = Object.assign({}, request.body, request.query, request.param);

        try {
            await validator(data, {
                email: 'required|email',
                password: 'required',
            })
        } catch (e) {
            request.errors = e
            return { errors: e }
        }

        let user = await User.where({email: data.email}).first();

        if (!user) {
            response.status(400)
            return {
                message: 'Failed to login!'
            }
        }

        if (!bcrypt.compareSync(data.password, user.attributes.password)) {
            response.status(400)
            return {
                message: 'Failed to login, bad password!'
            }
        }
        request.user = user;
        delete request.user.password; // delete the password from the session
        request.session.user = user;  //refresh the session value
        response.locals.user = user;
        request.session.save();
        return response.redirect('/')
    }
}