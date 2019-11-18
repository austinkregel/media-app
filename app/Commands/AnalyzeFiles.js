const File = app.require('app/File');
const Command = require('forge-cli/src/Command');

module.exports = class AnalyzeFiles extends Command {
    constructor(context) {
        super(context);
        this.signature = 'meta-data:sync'
    }
    async handle() {
        let files;
        let page = 1;
        do {
            files = await File.paginate(15, page++);
        } while (files && files.hasMorePages());
    }
}