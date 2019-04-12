const Model = require('./Model')
const bcrypt = app.make('bcrypt')

module.exports = class User extends Model {
    fillable() {
        return [
            'name',
            'email',
            'password',
        ]
    }

    constructor(...args) {
        super(...args)

        this.on('saving', async (userInstance) => {
            let changed = Object.assign({}, userInstance.changed);

            if (changed.password) {
                userInstance.changed.password = bcrypt.hashSync(changed.password,  10)
                userInstance.attributes.password = userInstance.changed.password
            }
            console.log({changed})
        })
    }
}
