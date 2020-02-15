const Queue = require('../../bootstrap/Queue');
const { setQueues } = require('bull-board');
const NewSongFoundEvent = app.require('app/Events/NewSongFoundEvent');
const NewSongFoundListener = app.require('app/Listeners/NewSongFoundListener');

module.exports = class EventServiceProvider {   
    constructor() {
        this.events = {
            [NewSongFoundEvent.class]: [
                NewSongFoundListener
            ]
        }
    }
	register() {
        Object.keys(this.events).map(eventName => {
            const listeners = this.events[eventName];

            listeners.map(listener => Bus.on(eventName, app.make(listener).handle))
        })
    }
};
