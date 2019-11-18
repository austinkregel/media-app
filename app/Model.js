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

    for (let index in fillable) {
        if (data[fillable[index]] !== undefined) {
            object[fillable[index]] = data[fillable[index]]
        }
    }

    return Object.assign({}, object, data);
}

module.exports = class BookshelfModel extends app.Model {
    constructor(...args) {
        super(...args);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

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

    async update(data) {
        return await this.$query().patchAndFetchById(this.id, this.fillableFilter(data))
    }

    fillableFilter(data) {
        let goodData = {};
        this.fillable().forEach((value) => {
            if (data[value]) {
                goodData[value] = data[value]
            }
        });
        return goodData;
    }

    async delete() {
        return await this.$query().delete()
    }
    static where(...params) {
        return this.query().skipUndefined().where(...params);
    }
    static whereIn(field, values) {
        return this.query().skipUndefined().whereIn(field, values);
    }
    static async paginate(per_page, current_page, callback) {
        var pagination = {};
        var per_page = per_page || 10;
        var page = current_page || 1;
        if (page < 1) page = 1;
        var offset = (page - 1) * per_page;

        let query = this.query();

        query = callback(query);

        const rows = await query.range(per_page * page - per_page, per_page * page);

        return {
            total: rows.total,
            page,
            per_page: per_page,
            offset: offset,
            to: (offset + rows.results.length) || undefined,
            last_page: Math.ceil(rows.total / per_page),
            current_page: page,
            from: offset,
            data: rows.results || [],
            hasMorePages: () => {
                return rows.total > (offset + rows.results.length);
            }
        }
    };
}