const NewSongFoundEvent = app.require('app/Events/NewSongFoundEvent');
const Command = require('forge-cli/src/Command');

module.exports = class AnalyzeFiles extends Command {
	constructor(context) {
		super(context);
		this.signature = 'listeners';
		this.cache = {};
	}
	async handle() {
	}
}
