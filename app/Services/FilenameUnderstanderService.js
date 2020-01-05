var patterns = {
	season: /(Season[.][0-9]{1,2})|([Ss]?([0-9]{1,2}))[Eex]|([Ss]([0-9]{1,2}))/gi,
	episode: /([Eepx]([0-9]{2})(?:[^0-9]|$))|[0-9]{1,2}.[0-9]{1,2}|(Ep?[\s\-][0-9]{1,2})/,
	year: /([\[\(]?((?:19[0-9]|20[0-9]|21[0-9])[0-9])[\]\)]?)/,
	resolution: /(([0-9]{3,4}(?:p|i)))[^M]|([0-9]+x[0-9]+)/gi,
	quality: /hdtv|bluray|(?:b[dr]|dvd|hd|tv)rip|web.?(?:dl|rip)|dvd|telesync|upscaled|desiscr\-rip|MAXPRO|HEVC|hdrip-lc|HDTC/gi,
	codec: /dvix|mpeg[0-9]|divx|xvid|(?:x|h)[-\. ]?26(?:4|5)|avc|hevc/i,
	audio: /MP3|DD5\.?1|Dual[\- ]Audio|LiNE|DTS|AAC-LC|AAC|AAC51|AAC(?:\.?2\.0)|AC3(?:\.5\.1)|AC3|(5\.1)?/gi,
	group: /(- ?([^-]+))$|mafiaking|Kybik.v.Kybe$|M2Tv|YIFY$|QEB/gi,
	region: /R[0-9]/,
	extended: /EXTENDED|EXTDED|EXT/i,
	hardcoded: /HC/,
	platform: /PS3/,
	proper: /PROPER/,
	repack: /REPACK/,
	container: /\.(mkv|avi|mp4|ogg|wmv|m4p|3gp|m4v|svi|3g2|vob|vod|webm|flv|flac|aac|mp3|wma|alac|mov)$/gi,
	container2: /(MKV|AVI|MP4|OGG|WMV|MOV|MkvCage)/,
	website: /^(\[ ?([^\]]+?) ?\])/,
	language: /(?:TRUE)?FR(?:ENCH)?|EN(?:G(?:LISH)?)?|VOST(?:(F(?:R)?)|A)?|MULTI(?:Lang|Truefrench|\-VF2)?|SUBFRENCH|rus|Hindi|Ita|Eng|CHS/g,
	size: /(?:([0-9]+(MB|GB|KB|TB)))/gi,
	rating: /UNRATED/i
};

module.exports = class FilenameUnderstanderService {
	constructor() {
		this.files = [];
	}
	lookup(filepath, type = 'movies') {
		if (type === 'movies') {
			this.files = this._lookupMovies(filepath);
		} else if (type === 'tv shows') {
			this.files = this._lookupTV(filepath);
		}
		return this.files;
	}

	_standardTrim(arrayOfNames = []) {
		return arrayOfNames.map((name) => {
			// name = name.replace(/([^a-zA-Z0-9\']+)/gi, ' ');
			// name = name.replace(/^[?!0\d]+/g, ' ');
			let index = 0;
			name = name
				.replace(/[\.]+|[\_]+|[\-]+/g, ' ')
				.split(' ')
				.filter((part) => {
					// If the part is empty
					if (part === '') {
						index++;
					} else {
						index = 0;
					}

					if (index > 1) {
						return false;
					}

					if (part === '') {
						return false;
					}

					return true;
				})
				.join(' ');
			name = name.trim();
			return name;
		});
	}

	_extractPattern(obj, key, patternKeys = []) {
		let index = -1;
		return [
			...new Set(
				patternKeys.reduce(
					(cleaned, pattern) => {
						index++;
						cleaned.push(cleaned[index].replace(patterns[pattern], ''));
						return cleaned;
					},
					[ obj[key] ]
				)
			)
		];
	}

	_lookupMovies(filepath) {
		let mediaObject = {};
		let justFilepath;
		if (filepath.includes('/')) {
			justFilepath = filepath.split('/').reverse()[0];
		}

		if (justFilepath.match(patterns.container)) {
			justFilepath = justFilepath.replace(patterns.container, '');
		}

		for (let pattern in patterns) {
			let val;
			if ((val = filepath.match(patterns[pattern]))) {
				mediaObject[pattern] = [
					...new Set(
						val
							.map((line) => {
								if (!line) {
									return false;
								}
								if (line.includes('/')) {
									line = line.split('/').reverse()[0];
								}

								if (pattern !== 'container' && line.match(patterns.container)) {
									line = line.replace(patterns.container, '');
								}

								return line.replace(/[^\w\s]/gi, '');
							})
							.filter((i) => i)
					)
				];
			}
		}
		mediaObject['parsed_title'] = justFilepath;
		mediaObject['parsed_title'] = this._extractPattern(mediaObject, 'parsed_title', [
			'container',
			'container2',
			'audio',
			'episode',
			'season',
			'resolution',
			'quality',
			'codec',
			'size',
			'website',
			'extended',
			'group',
			'year',
			'language',
			'rating'
		]);

		mediaObject['parsed_title'] = this._standardTrim(mediaObject['parsed_title']).reverse()[0];

		// objectThing['parsed_title'] = objectThing['parsed_title'].charAt(0).toUpperCase() + objectThing['parsed_title'].substr(1, objectThing['parsed_title'].length - 1).toLowerCase();
		mediaObject['file'] = filepath;

		mediaObject.title = this._filterTitle('movies', mediaObject);

		return mediaObject;
	}

	_lookupTV(filepath) {
		let mediaObject = {};
		let justFilepath;
		let folder;
		filepath = filepath.replace('/home/austinkrege/Alexandria/TV Shows', '');
		if (filepath.includes('/')) {
			// Should be the file name.
			justFilepath = filepath.split('/').reverse()[0];
			folder = filepath.split('/')[0];
		} else {
			justFilepath = filepath;
		}

		if (!justFilepath) {
			console.log({ filepath, justFilepath, folder });
			return;
		}

		if (justFilepath.match(patterns.container)) {
			justFilepath = justFilepath.replace(patterns.container, '');
		}

		for (let pattern in patterns) {
			let val;
			if ((val = justFilepath.match(patterns[pattern]))) {
				mediaObject[pattern] = [
					...new Set(
						val
							.map((line) => {
								if (!line) {
									return false;
								}

								if (pattern !== 'container' && line.match(patterns.container)) {
									line = line.replace(patterns.container, '');
								}

								return line.replace(/[^\w\.\s]/gi, '');
							})
							.filter((i) => i)
					)
				];
			} else if (folder && (val = folder.match(patterns[pattern]))) {
				mediaObject[pattern] = [
					...new Set(
						val
							.map((line) => {
								if (!line) {
									return false;
								}

								if (pattern !== 'container' && line.match(patterns.container)) {
									line = line.replace(patterns.container, '');
								}

								return line.replace(/[^\w\s]/gi, '');
							})
							.filter((i) => i)
					)
				];
			}
		}
		mediaObject['parsed_title'] = justFilepath;
		mediaObject['parsed_title'] = this._extractPattern(mediaObject, 'parsed_title', [
			'container',
			'container2',
			'audio',
			'episode',
			'season',
			'resolution',
			'quality',
			'codec',
			'size',
			'website',
			'extended',
			'group',
			'year',
			'language',
			'rating'
		]);
		mediaObject['parsed_title'] = this._standardTrim(mediaObject['parsed_title']).reverse()[0];

		if (!mediaObject['parsed_title']) {
			console.log(mediaObject, filepath);
			mediaObject['parsed_title'] = mediaObject['group'][0];
		}

		mediaObject['file'] = filepath;
		mediaObject['folder'] = folder;

		if (mediaObject['episode'] && mediaObject['episode'][0].includes('.')) {
			let [ season, episode ] = mediaObject['episode'][0].split('.');
			mediaObject['season'] = mediaObject['season'] || season;
			mediaObject['episode'] = episode;
		}

		mediaObject.title = this._filterTitle('tv shows', mediaObject);

		return mediaObject;
	}

	_filterTitle(type, mediaObject) {
		if (type === 'movie') {
			return mediaObject.parsed_title;
		} else if (type === 'tv shows') {
			if (mediaObject.folder) {
				return (
					mediaObject.folder +
					(mediaObject.season ? ' S' + mediaObject.season : '') +
					(mediaObject.episode ? ' E' + mediaObject.episode : '')
				);
			}

			return mediaObject.parsed_title;
		}
	}
};
