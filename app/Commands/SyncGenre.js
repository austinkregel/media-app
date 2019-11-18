const Genre = app.require('app/Genre');
const Command = require('forge-cli/src/Command');
const MediaLookupService = app.require('app/Services/MediaLookupService');
const mediaService = new MediaLookupService;
const axios = require('axios');

module.exports = class SyncGenres extends Command {
    constructor(context) {
        super(context);
        this.signature = 'sync:genres'  
        this.apiKey = 'api_key='+process.env.MOVIE_DATABASE_API_KEY + '&language=en-US'
        this.axios = axios.create({
            baseURL: 'https://api.themoviedb.org/3',
        })

    }
    async handle() {
        await Genre.query().truncate();

        const { data: { genres } } = await this.axios.get('/genre/movie/list?'+this.apiKey)
        await Promise.all(genres.map(async genre => await Genre.create(genre)));

        const { data: { genres: genres2 } } = await this.axios.get('/genre/tv/list?'+this.apiKey)
        await Promise.all(genres2.map(async genre => await Genre.create(genre)));

        app.close();
    }
}