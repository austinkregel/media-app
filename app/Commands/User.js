const User = app.require('app/User');
const Command = require('forge-cli/src/Command');

module.exports = class UserCommand extends Command {
    constructor(context) {
        super(context);
        this.signature = 'admin:user'
    }
    async handle() {
        let { name, email, password } = await this.inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What's your name?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What's your email?",
            },
            {
                type: 'password',
                name: 'password',
                message: "What's your password?",
            }
        ])

        const user = await User.create({ name, email, password})
        console.log("Welcome " + user.name);
        app.close();
    }
}