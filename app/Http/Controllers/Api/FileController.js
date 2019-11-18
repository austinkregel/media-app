const Media = app.require('app/Media')
const axios = require('axios');
const MediaLookupService = app.require('app/Services/MediaLookupService');
const mediaService = new MediaLookupService;

module.exports = class FileController {
    async index(req, res) {
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 15;
        const offset = (page - 1) * limit;

        let results = await Media.query()
            .eager('genres', 'file')
            .range((page * limit) - limit, limit * page);

        return {
            total: results.total,
            per_page: limit,
            to: (offset + results.results.length) || undefined,
            last_page: Math.ceil(results.total / limit),
            current_page: page,
            from: offset,
            data: results.results || [],
            hasMorePages: () => results.total > (offset + results.results.length)
        }
    }

    async search(req, res) {
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 15;
        const offset = (page - 1) * limit;

        const query = req.params.query ? req.params.query: '';
        const likeAllQuery = '%' + query.split('').join('%') + '%';
        const likeRightQuery = query + '%';
        const likeLeftQuery = '%' + query;
        const likeInbetweenQuery = '%' + query + '%';


        let results = await Media.query()
            .select('*', app.knex.raw(`
if (
    name = ?,
    300,
    if (
        name like ?,
        150,
        if (
            name like ?,
            150,
            if (
                name like ?,
                50,
                if (
                    name like ?,
                    1,
                    0
                )
            )
        )
    )
) as rank
`, [
    query,
    likeRightQuery,
    likeLeftQuery,
    likeInbetweenQuery,
    likeAllQuery
]))
            .eager('genres', 'file')
            .where('name', '=', query)
            .orWhere('name', 'like', likeRightQuery)
            .orWhere('name', 'like', likeLeftQuery)
            .orWhere('name', 'like', likeInbetweenQuery)
            .orWhere('name', 'like', likeAllQuery)
            .orderBy('rank', 'desc')
            .orderBy('name', 'desc')

            .range((page * limit) - limit, limit * page);

        return {
            total: results.total,
            per_page: limit,
            to: (offset + results.results.length) || undefined,
            last_page: Math.ceil(results.total / limit),
            current_page: page,
            from: offset,
            data: results.results || [],
            hasMorePages: () => results.total > (offset + results.results.length)
        }
    }

    async show(req, res) {
        return await File.query().eager('genres').findById(req.params.id)
    }

    async update(req, res) {
        const file = await File.query().eager('genres').findById(req.params.id)

        if (!file) {
            return {
                message: 'No file found'
            }
        }

        let data = req.body;

        for (let field in data) {
            if (data[field] === file[field]) {
                delete data[field];
            }
        }

        if (file.normalized_name !== req.body.normalized_name) {
            let {
                name: normalized_name,
                    rank: ranking,
                poster,
                backdrop,
                type,
                plot,
                runtime,
                release_date
            } = await mediaService.lookup(req.body.normalized_name);

            data = Object.assign(data, {
                normalized_name,
                ranking,
                poster,
                backdrop,
                type,
                plot,
                runtime,
                release_date,
            });
        }
        return await file.update(data);
    }
}