const File = app.require('app/File');
const Command = require('forge-cli/src/Command');
const nlp = require('compromise');
const FileService = require('../Services/FilenameUnderstanderService');
const fileService = new FileService();
const MediaLookupService = require('../Services/MediaLookupService');
const mediaService = new MediaLookupService();
const md5File = require('md5-file/promise');

module.exports = class AnalyzeFiles extends Command {
	constructor(context) {
		super(context);
		this.signature = 'meta-data:sync';
		this.cache = {};
	}
	async handle() {
		const files = app.fs.find_recursive('/home/austinkregel/Alexandria/Movies');

		const researchedFiles = files.map((file) =>
			fileService.lookup(file.replace('/home/austinkregel/Alexandria/Movies/', ''), 'tv shows')
		);

		console.log('Starting 0/' + researchedFiles.length);
		let index = 0;
		const filesLookUp = await Promise.all(
			researchedFiles.map(async ({ file }) => {
				let hash = await md5File('/home/austinkregel/Alexandria/Movies/' + file);
				let fileRecord = await File.query().findOne({ hash: hash });
				console.log('Starting ', fileRecord, hash, '/home/austinkregel/Alexandria/Movies/' + file);
				index++;
				return fileRecord;
			})
		);

		const filesToLookUp = filesLookUp.filter((record) => !record);

		console.log({ filesToLookUp });

		// await Promise.all(filesToLookUp.map(async (item) => await this.findMedia(item)));

		// Now that we have a cohereant list of files, let's ACTUALLY look them up with an external service
		// Then we can get them all important photos. (Should probably cache the data so we're not hitting it for every episode and every season...)

		// Once we get have all the researched data we need to create records in our database.

		app.closeActions.push(() => process.exit(0));
		setTimeout(() => app.close(), 500);
	}

	// This will find media based off a specific field. If it's already set then it'll just skippit.
	async findMedia(media) {
		await this._cacheIfPossible('title', media);
		await this._cacheIfPossible('parsed_title', media);
		await this._cacheIfPossible('folder', media);
	}

	async _cacheIfPossible(field, media) {
		if (media[field]) {
			try {
				if (this.cache[media[field]] !== null && this.cache[media[field]] === undefined) {
					let response = await mediaService.lookup(media[field]);

					this.cache[media[field]] = response;
				}
			} catch (e) {
				this.cache[media[field]] = null;
			}
		}
	}
};
