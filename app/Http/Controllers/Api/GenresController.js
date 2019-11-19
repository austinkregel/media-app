const fs = require('fs');
module.exports = class GenresController {
	async index(req, res) {
		const Genre = app.require('app/Genre');

		let page = req.query.page ? req.query.page : 1;
		let limit = req.query.limit ? req.query.limit : 15;
		const offset = (page - 1) * limit;

		let results = await Genre.query().eager('[medias.[genres, files]]').range(page * limit - limit, limit * page);

		return {
			total: results.total,
			per_page: limit,
			to: offset + results.results.length || undefined,
			last_page: Math.ceil(results.total / limit),
			current_page: page,
			from: offset,
			data: results.results || [],
			hasMorePages: () => results.total > offset + results.results.length
		};
	}
};
