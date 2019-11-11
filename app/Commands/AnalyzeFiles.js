const File = app.make(app.base_path('app/File'));
const Command = require('forge-cli/src/Command');

module.exports = class AnalyzeFiles extends Command {
    constructor(context) {
        super(context);
        this.signature = 'meta-data:sync'
    }
    handle() {

        // let files;
        // let page = 1;
        // do {
        //     const files = await File.paginate(15, page++, true);
        //     const parts = files.data.map((part) => {
        //         return oleoo.guess(part.attributes.name);
        //     })

        //     console.log(parts)
        // } while (files && files.hasMorePages());
    }
}