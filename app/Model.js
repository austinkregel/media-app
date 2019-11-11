let promiseMe = (closure) => new Promise((resolve, reject) => {
    try {
        closure().then(resolve);
        // resolve({});
    } catch (e) {
        reject(e);
    }
})

const fillableData = (data, fillable) => {
    let object = {};

    for(let index in fillable) {
        object[fillable[index]] = data[fillable[index]]
    }

    return Object.assign({}, fillable, data);
}
const { Model } = require('objection');
module.exports = class BookshelfModel extends Model {
    static get tableName() {
        return app
            .make('pluralize')(this.name)
            .toLowerCase();
    }

    get hasTimestamps() {
        return ['created_at', 'updated_at'];
    }
    get hidden() {
        return [];

    }

    static create(data) {
        return promiseMe(() => this.query().insert(fillableData(data)))
    }

    update(data) {
        return this.save(fillableData(data, this.attributes))
    }

    delete(id) {
        return promiseMe(() => this.constructor.find(id).destroy())
    }
    find(id) {
        return promiseMe(async () => await this.$query.find(id));
    }
    static where(...params) {
        return this.query().skipUndefined().where(...params);
    }
    static whereIn(field, values) {
        return this.query().skipUndefined().whereIn(field, values);
    }
    async paginate(per_page, current_page) {
		var pagination = {};
		var per_page = per_page || 10;
		var page = current_page || 1;
		if (page < 1) page = 1;
        var offset = (page - 1) * per_page;
		return Promise.all([
				this.clone().count(),
		        this.offset(offset).limit(per_page).fetchAll()
			])
			.then(([total, rows]) => {
				return  {
                    total: total,
                    per_page: per_page,
                    offset: offset,
                    to: (offset + rows.length) || undefined,
                    last_page: Math.ceil(total / per_page),
                    current_page: page,
                    from: offset,
                    data: rows.models || [],
                    hasMorePages: () => {
                        return total < (offset+rows.length);
                    }
                };
			});
	};
}