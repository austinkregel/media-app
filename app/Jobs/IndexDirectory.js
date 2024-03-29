const File = require(app.base_path('app/File'));
const Command = require('forge-cli/src/Command');
const mime = require('mime-types');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dayjs = require('dayjs');
const { basename } = require('path');
const isMedia = (filePath) =>
	in_array(mime.lookup(filePath), [
		'video/x-m4v',
		'video/x-matroska',
		'video/mpeg4-generic',
		'video/mp4',
		'video/x-flv',
		'video/h265',
		'video/h264',
		'video/vp8',
		'audio/mp3',
		'audio/mpeg',
		'audio/x-aac',
		'audio/aac',
		'audio/x-flac',
		'audio/ac3'
	]);
const md5File = require('md5-file/promise');
const torrentName = require('torrent-name-parser');
const MediaLookupService = require('../Services/MediaLookupService');
const mediaService = new MediaLookupService();
const Media = app.require('app/Media');

function iterate(dir) {
	return fs
		.readdirAsync(dir)
		.map(function(file) {
			file = path.resolve(dir, file);
			return fs.statAsync(file).then(async function(stat) {
				if (stat.isDirectory()) {
					return await iterate(file);
				} else {
					return file;
				}
			});
		})
		.then(function(results) {
			// flatten the array of arrays
			return Array.prototype.concat.apply([], results);
		})
		.catch((e) => []);
}
const in_array = (needle, haystack) => haystack.includes(needle);
const torrentNameFix = (fileName) =>
	(torrentName(app.searchify(fileName)).title || '')
		.replace(/^[\d]{1,5}\./, '')
		.replace(/\./g, ' ')
		.replace(/mp3$/, '')
		.split(' ')
		.filter((i) => i.trim())
		.join(' ')
        .trim();
        
module.exports = class ProcessFiles {
    static get getQueueName() {
        return 'index:directory';
    }

    async handle() {
		Bus.clients((socket) => {
			console.log('starting...');
			socket.emit('command:index', 1);
		});
		console.log('starting...');

		let location = '/home/austinkregel/Alexandria';

		let files = (await iterate(location)) || [];
		files = files.filter(isMedia);

		let cache = [];
		let i = 0;
		for (let index in files) {
			const rawPercent = (Object.keys(files).length > 0 ? i / Object.keys(files).length : 0) * 100;
			Bus.clients((socket) => {
				console.log('Indexing... ' + rawPercent.toFixed(2));
				socket.emit('command:index', rawPercent.toFixed(2));
			});

			i++;
			let file = files[index];
			let hash = await md5File(file);
			let fileRecord = await File.query().findOne({ hash: hash });

			if (!fileRecord) {
				const info = fs.lstatSync(file);
				fileRecord = await File.create({
					name: path.basename(file),
					mime_type: mime.lookup(file),
					file_path: file,
					should_convert: mime.lookup(file) !== 'video/mp4',
					converted_at: null,
					size: info.size * 0.00000095367432,
					bytes: info.size,
					hash,
					type: null,
					extra: null,
					created_at: dayjs(info.birthtime).format('YYYY-MM-DD HH:ss:mm'),
					updated_at: dayjs(info.utime).format('YYYY-MM-DD HH:ss:mm')
				});
			}
			// const mediaName = torrentNameFix(basename(file));

			// try {
			// 	// #region Update the media record. At the end of the region you'll be abble to use the mediaFile variable.
			// 	if (!cache[mediaName]) {
			// 		let media = await mediaService.lookup(mediaName);
			// 		if (!media) {
			// 			console.log('Failed to find a record for', {
			// 				mediaName
			// 			});
			// 			continue;
			// 		}
			// 		// Just get the first item...
			// 		cache[mediaName] = media;
			// 	}

			// 	let {
			// 		name,
			// 		rank,
			// 		poster,
			// 		backdrop,
			// 		plot,
			// 		type,
			// 		runtime,
			// 		popularity,
			// 		revenue,
			// 		tagline,
			// 		release_date,
			// 		genres
			// 	} = cache[mediaName];

			// 	let mediaFile = await Media.query().where('name', '=', name);

			// 	if (mediaFile.length === 0) {
			// 		mediaFile = await Media.query().insertAndFetch({
			// 			name,
			// 			rating: rank,
			// 			poster,
			// 			backdrop,
			// 			plot,
			// 			runtime,
			// 			popularity,
			// 			revenue,
			// 			tagline,
			// 			release_date
			// 		});
			// 	} else {
			// 		mediaFile = mediaFile[0];
			// 	}

			// 	await mediaFile.update({
			// 		name,
			// 		rating: rank,
			// 		poster,
			// 		backdrop,
			// 		plot,
			// 		runtime,
			// 		popularity,
			// 		revenue,
			// 		tagline,
			// 		release_date
			// 	});

			// 	fileRecord.update({
			// 		name,
			// 		type,
			// 		media_id: mediaFile.id
			// 	});

			// 	await mediaFile.$relatedQuery('genres').unrelate();

			// 	await Promise.all(
			// 		genres.map(async (genre) => await mediaFile.$relatedQuery('genres').relate(genre.id))
			// 	);
			// 	// #endregion
			// } catch (e) {
			// 	console.error('Encountered sevre error:', e);
			// }
		}
		Bus.clients((socket) => {
			console.log('Finished!');
			socket.emit('command:index', 100);
		});
		app.close();
    }

    toJson() {
        return {
            path: '/home/austinkregel/Alexandria'
        }
    }
}