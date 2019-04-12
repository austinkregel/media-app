process.env.APP_ENV = 'production'

require('../app')

let Router =  app.make('Router');

module.exports = Router;