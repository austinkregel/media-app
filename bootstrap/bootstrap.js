/*-----------------------------------------------------------------
 * Here we're going to register all the dependencies for the app
 * that way we everything gets registered in the same place.
 *-----------------------------------------------------------------
 */
const { validateAll } = require('indicative')

const knex = require('knex')(app.config.database[app.config.database.connection]);
const { Model } = require('objection');

Model.knex(knex);
app.Model = Model;

app.closeActions.push(function() {
    knex.destroy()
})

knex.schema.hasTable('users').catch(e => {
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
        knex.destroy()
        throw new Error("Database not set up!")
    }
})

/**
 * Reigster the models here.
 */
app.aliases({
    'validator': validateAll,
})