const Model = require('./Model')
const bcrypt = app.make('bcrypt')
const Password = require('objection-password')();

module.exports = class User extends Password(Model) {
    fillable() {
        return [
            'name',
            'email',
            'password',
        ]
    }
}
