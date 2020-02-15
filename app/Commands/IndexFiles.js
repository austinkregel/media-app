const IndexDirectory = app.require('app/Jobs/IndexDirectory');
const Command = require('forge-cli/src/Command');
const axios = require('axios');

module.exports = class Index extends Command {
	constructor(context) {
		super(context);
		this.signature = 'index {directory}';
	}

	async handle() {
		axios.post('http://localhost:3000/api/job', {
			'name': 'index:directory',
			'data': { 
				path: '/home/austinkregel/Alexandria'
			}
		})
	}
};
