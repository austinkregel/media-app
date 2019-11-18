let axios = require('axios')
const rateLimit = require('axios-rate-limit');

module.exports = class MediaLookupService {
    constructor()  {
        this.apiKey = 'api_key='+process.env.MOVIE_DATABASE_API_KEY + '&language=en-US'
        this.axios = rateLimit(
            axios.create({
                baseURL: 'https://api.themoviedb.org/3',
            }),
            {
                maxRequests: 40,
                perMilliseconds: 1000,
                maxRPS: 35
            }
        )
        this.movieDbImageUrl = 'https://image.tmdb.org/t/p/w500';
        this.getGenres();
        console.log('Getting genres')
    }

    async getGenres() {
        this.genres = [];
        let { data: { genres } } = await this.axios.get('/genre/tv/list?'+this.apiKey)
        this.genres.push(...genres)

        let { data: { genres: genres2 } } = await this.axios.get('/genre/movie/list?'+this.apiKey)
        this.genres.push(...genres2)
    }

    async lookup(title) {
        let { data: { results } } = await this.axios.get('/search/multi?query=' + title+ "&"+this.apiKey)

        const theMovieDb = results[0];

        if (!theMovieDb) {
            console.log('Failed to created a record for', {
                title,
                results
            })
            return null;
        }

        let { data: {
            genres,
            title: name,
            vote_average: rank,
            poster_path: poster,
            backdrop_path: backdrop,
            overview: plot,
            runtime,
            revenue,
            popularity,
            tagline,
            release_date,
        } } = await this.axios.get('/' + theMovieDb.media_type + '/' + theMovieDb.id + '?'+ this.apiKey);
        backdrop = this.movieDbImageUrl + backdrop;
        poster = this.movieDbImageUrl + poster;
        return {
            genres,
            name,
            rank,
            poster,
            backdrop,
            type: theMovieDb.media_type,
            plot,
            runtime,
            revenue,
            tagline,
            popularity,
            release_date,
        }
    }
}