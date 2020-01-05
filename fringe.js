let Application = require('forge-cli');
require('dotenv').config()
require('fringejs');
app.closeActions = [];

require('./bootstrap/helpers');

const Config = app.make('Config');

/*-----------------------------------------------------------------
 * Generally we're going to configure our own config directory
 * since we can change where we want to put the config directory.
 *-----------------------------------------------------------------
 */
app.config = Config.register(app.base_path('/config'));

require('./bootstrap/bootstrap')

app.close = () => {
    app.closeActions.map(closure => closure());
}
app.register(app.config.app.providers.filter(provider => ![
    app.base_path('app/Providers/RouteServiceProvider.js')
].includes(provider)));

Application.register(__dirname, [
    // You can register either a whole directory or a single command, or both!
    'app/Commands'
]);

let args = Object.assign({}, { args: process.argv });
// This "starts" the application

Application.start(args) 
