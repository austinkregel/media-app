const Model = require('./Model')
const bcrypt = app.make('bcrypt')

module.exports = class Media extends Model {
    fillable() {
        return [
            'id',
            'name',
            'rating',
            'plot',
            'poster',
            'backdrop',
            'runtime',
            'popularity',
            'release_date',
            'revenue',
            'tagline',
            'created_at',
            'updated_at',
        ]
    }
    static get tableName() {
        return 'medias';
      }

    static get relationMappings() {
        return {
            files: {
                relation: app.Model.HasManyRelation,
                modelClass: app.require('app/File'),
                join: {
                    from: 'medias.id',
                    to: 'files.media_id',
                }
            },

            genres: {
                relation: app.Model.ManyToManyRelation,
                modelClass: app.require('app/Genre'),
                join: {
                    from: 'genres.id',
                    through: {
                        from: 'media_genres.media_id',
                        to: 'media_genres.genre_id'
                    },
                    to: 'medias.id',
                }
            },
        }
    };
}
