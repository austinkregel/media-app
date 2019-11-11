const File = require(app.base_path('app/File'));
const Command = require('forge-cli/src/Command');
const mime = require('mime-types');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const ora = require('ora')
const dayjs = require('dayjs');
const isMedia = filePath => in_array(mime.lookup(filePath), ['video/x-m4v', 'video/x-matroska', 'video/mpeg4-generic', 'video/mp4', 'video/x-flv', 'video/h265', 'video/h264', 'video/vp8', 'audio/mp3', 'audio/mpeg', 'audio/x-aac', 'audio/aac', 'audio/x-flac', 'audio/ac3',])
const md5File = require('md5-file/promise')
const torrentName = require('torrent-name-parser');
const axios = require('axios');

var crypto = require("crypto");
var stream = require("stream");
function iterate(dir) {
    return fs.readdirAsync(dir).map(function (file) {
        file = path.resolve(dir, file);
        return fs.statAsync(file).then(async function (stat) {
            if (stat.isDirectory()) {
                return await iterate(file);
            } else {
                return file;
            }
        })
    }).then(function (results) {
        // flatten the array of arrays
        return Array.prototype.concat.apply([], results);
    }).catch(e => []);
}
const in_array = (needle, haystack) => haystack.includes(needle)

module.exports = class Theory extends Command {
    constructor(context) {
        super(context);
        this.signature = 'index {directory}';
    }

    async handle() {
        let location = this.argument('directory').startsWith('/') ? this.argument('directory') : path.join(process.cwd(), this.argument('directory'));
    
        let message = 'Locating files in [' + location + ']: ';
        let spinner = ora(message).start();
        const time = dayjs();

        console.log(message);
        console.log('')
        
        let interval = setInterval(() => {
            spinner.text = message + dayjs().diff(time, 'seconds') + 's...'
        }, 100)
        let files = await iterate(location) || []
        files = files.filter(isMedia)
        spinner.succeed();

        let cache = [];
        clearInterval(interval);
        for (let index in files) {   
            let file = files[index]
            // let spinner = ora('Calculating the hash for [' + file + ']').start();
            let hash = await md5File(file);
            spinner.text = 'Getting file stats...'

            let info = await fs.statSync(file);
            // spinner.text = 'Finding if there are any existing...';
            
            let file_ = await File.query().findOne({'hash': hash});


            if (file_) {
                if (file_.normalized_name) {
                    continue;
                }
                try {
                    const torrentNameFix = fileName => (torrentName(fileName).title || '').replace(/^[\d]{1,5}\./, '').replace(/\./g, ' ').replace(/mp3$/, '').trim()
                    const mediaName = torrentNameFix(file_.name)
                    

                    if (!cache[mediaName]) {
                        let { data: media } = await axios.get('http://www.omdbapi.com/?apikey=' + process.env.OMD_API_KEY + '&t=' + mediaName)
                        cache[mediaName] = media;
                    }
                    let media = cache[mediaName];

                    file_.update({
                        normalized_name: media.Title,
                        rating: media.Rated,
                        genre: media.genre,
                        plot: media.Genre,
                        poster: media.Poster,
                        imdbRating: media.imdbRating,
                        runtime: media.Runtime,
                    })                
                } catch (e) {
                    console.error(e)
                }

                if (file_ !== null) {
                    // spinner.text = ('We found a duplicate file [' + file + '] [' + file_.attributes.hash + ']')
                    // spinner.fail()
                    continue;
                }
            } else {
                let name = path.basename(file);
                const torrentNameFix = fileName => (torrentName(fileName).title || '').replace(/^[\d]{1,5}\./, '').replace(/\./g, ' ').replace(/mp3$/, '').trim()
                const mediaName = torrentNameFix(name)
                if (!cache[mediaName]) {
                    let { data: media } = await axios.get('http://www.omdbapi.com/?apikey=' + process.env.OMD_API_KEY + '&t=' + mediaName)
                    cache[mediaName] = media;
                }
                let media = cache[mediaName];
                // spinner.succeed('Unique file found ' + file)
                await File.create({
                    name,
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
                    updated_at: dayjs(info.utime).format('YYYY-MM-DD HH:ss:mm'),
                    normalized_name: media.Title,
                    rating: media.Rated,
                    genre: media.genre,
                    plot: media.Genre,
                    poster: media.Poster,
                    imdbRating: media.imdbRating,
                    runtime: media.Runtime,

                })
            }
        }
    }
}
