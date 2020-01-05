/*-----------------------------------------------------------------
 * Here we're going to register all the dependencies for the app
 * that way we everything gets registered in the same place.
 *-----------------------------------------------------------------
 */
const { validateAll } = require('indicative');

const knex = require('knex')(app.config.database[app.config.database.connection]);
const { Model } = require('objection');
const events = require('events');
const Bus = new events.EventEmitter();

Model.knex(knex);
app.Model = Model;
app.knex = knex;

app.closeActions.push(function() {
	knex.destroy();
});

global.Bus = Bus;
Bus.sockets = {};
Bus.clients = (closure) => {
	console.log('running ', Bus.sockets);
	Object.values(Bus.sockets).map((socket) => closure(socket));
};

knex.schema.hasTable('users').catch((e) => {
	if (e.code === 'ER_ACCESS_DENIED_ERROR') {
		knex.destroy();
		throw new Error('Database not set up!');
	}
});

/**
 * Reigster the models here.
 */
app.aliases({
	validator: validateAll
});
