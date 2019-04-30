const Model = require('./Model')
const bcrypt = app.make('bcrypt')

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
            'created_at',
            'updated_at',
        ]
    }
}
