const Event = require('./Event');
module.exports = class NewSongFoundEvent extends Event {
    constructor(song) {
        super();
        this.song = song;
    }
}