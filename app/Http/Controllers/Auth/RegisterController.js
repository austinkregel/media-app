const User = app.make(app.base_path('app/User'));

module.exports =  class RegisterController {
    create(req) {
        return app.view.render('auth.register', {
            csrf: req.csrfToken()
        })
    }

    async store(request, response) {
        let validator = app.make('validator')

        const data = Object.assign({}, request.body, request.query, request.param);

        try {
            await validator(data, {
                name: 'required',
                email: 'required|email',
                password: 'required',
                password_confirmation: 'required_if:password|same:password',
            })
        } catch (e) {
            request.errors = e
            return { errors: e }
        }

        // Deleting the confirmation field since we don't want to save it
        delete data.password_confirmation

        try {
            const user = await User.create(data)

            request.user = user;
            delete request.user.password; // delete the password from the session
            request.session.user = user;  //refresh the session value
            response.locals.user = user;
        } catch (e) {
            console.error(e)
        }
        return response.redirect('/')
    }
};