const Model = require('./Model');
const bcrypt = app.make('bcrypt');

module.exports = class Genre extends Model {
	fillable() {
		return [ 'name' ];
	}

	static get relationMappings() {
		return {
			files: {
				relation: app.Model.ManyToManyRelation,
				modelClass: app.require('app/File'),
				join: {
					from: 'file.id',
					through: {
						from: 'file_genres.genre_id',
						to: 'file_genres.file_id'
					},
					to: 'genres.id'
				}
			},
			medias: {
				relation: app.Model.ManyToManyRelation,
				modelClass: app.require('app/Media'),
				join: {
					from: 'genres.id',
					through: {
						from: 'media_genres.genre_id',
						to: 'media_genres.media_id'
					},
					to: 'medias.id'
				}
			}
		};
	}
};
