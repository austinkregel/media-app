const Model = require('./Model');
const bcrypt = app.make('bcrypt');

module.exports = class File extends Model {
	fillable() {
		return [
			'name',
			'mime_type',
			'file_path',
			'should_convert',
			'converted_at',
			'size',
			'bytes',
			'hash',
			'type',
			'extra',
			'normalized_name',
			'rating',
			'poster',
			'backdrop',
			'type',
			'plot',
			'runtime',
			'release_date',
			'media_id'
		];
	}

	static get relationMappings() {
		return {
			genres: {
				relation: app.Model.ManyToManyRelation,
				modelClass: app.require('app/Genre'),
				join: {
					from: 'genres.id',
					through: {
						from: 'file_genres.file_id',
						to: 'file_genres.genre_id'
					},
					to: 'files.id'
				}
			},
			media: {
				relation: app.Model.BelongsToOneRelation,
				modelClass: app.require('app/Media'),
				join: {
					from: 'files.media_id',
					to: 'medias.id'
				}
			}
		};
	}
};
