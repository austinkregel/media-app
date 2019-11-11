const fs = require('fs');
const Transcoder = require('stream-transcoder')
module.exports = class HomeController {
    async index(req,res) {
        return await app.view.render('home')
    }

    async show(req, res) {
        const File = app.require('app/File');
        const fileRecord = await File.query().findById(req.params.id);

        var file = fileRecord.file_path;
        var stat = fs.statSync(file);
        var total = stat.size;

        if (req.headers['range']) {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];
        
            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total-1;
            var chunksize = (end-start)+1;
        
            var file = fs.createReadStream(file, {start: start, end: end});
            res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
            return file.pipe(res);
        } else {
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
            return fs.createReadStream(file).pipe(res, { end: true });
        }
    }
    async player (req, res) {
      const File = app.require('app/File');

      const file = await File.query().findById(req.params.id);

      return await app.view.render('player',  {
        file: JSON.stringify(file)
      })
    }
}