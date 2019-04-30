const File = require(app.base_path('app/File'));
const Command = require('forge-cli/src/Command');
const mime = require('mime-types');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const ora = require('ora')
const dayjs = require('dayjs');
const isMedia = filePath => in_array(mime.lookup(filePath), ['video/x-m4v', 'video/x-matroska', 'video/mpeg4-generic', 'video/mp4', 'video/x-flv', 'video/h265', 'video/h264', 'video/vp8', 'audio/mp3', 'audio/mpeg', 'audio/x-aac', 'audio/aac', 'audio/x-flac', 'audio/ac3',])

var crypto = require("crypto");
var stream = require("stream");
function sha1FromFile(s) {
    var hash = crypto.createHash('sha1');
    return new Promise(function (resolve, reject) {
        s.on('data', function (_) { return hash.update(_); })
            .on('end', function () { return resolve(formatHash(hash)); })
            .on('error', reject);
    });
}
function generateHash(b) {
    var hash = crypto.createHash('sha1');
    hash.update(b);
    return hash.digest('hex');
}

function iterate(dir) {
    return fs.readdirAsync(dir).map(function (file) {
        file = path.resolve(dir, file);
        return fs.statAsync(file).then(function (stat) {
            if (stat.isDirectory()) {
                return iterate(file);
            } else {
                return file;
            }
        })
    }).then(function (results) {
        // flatten the array of arrays
        return Array.prototype.concat.apply([], results);
    }).catch(e => e);
}
const in_array = (needle, haystack) => haystack.includes(needle)

module.exports = class Theory extends Command {
    constructor(context) {
        super(context);
        this.signature = 'index {directory}';
    }

    async handle() {
        let location = path.join(this.argument('directory') || process.cwd());
        let message = 'Locating files in [' + location + ']: ';
        let spinner = ora(message).start();
        const time = dayjs();

        let interval = setInterval(() => {
            spinner.text = message + dayjs().diff(time, 'seconds') + 's...'
        }, 100)
        let files = await iterate(location)
        files = files.filter(isMedia)
        spinner.succeed();
        clearInterval(interval);

        files.forEach(async file => {
            let hash = generateHash(fs.readFileSync(file));
            let info = await fs.statSync(file);
            let file_ = await File.where({ hash }).first();

            if (file_.attributes.hash) {
                console.error('We found a duplicate file [' + file + '] [' + file_.attributes.hash + ']')
                return;
            }

            await File.create({
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
            })
        })
    }
}
