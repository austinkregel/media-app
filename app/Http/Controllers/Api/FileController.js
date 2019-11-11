const File = app.require('app/File')

module.exports = class FileController {
    async index () {
        return await File.query().limit(15)
    }
}