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

    return object;
}

module.exports = class BookshelfModel extends app.shelf.Model {
    get tableName(){
        return app.make('pluralize')(this.constructor.name).toLowerCase()
    }

    get hasTimestamps() {
        return ['created_at', 'updated_at'];
    }
    get hidden() {
        return ['password'];
    }

    create(data) {
        console.log(this)
        return promiseMe(() => this.constructor.forge(fillableData(data, this.fillable())).save())
    }

    update(data) {
        return promiseMe(() => this.constructor.save(fillableData(data, this.fillable())))
    }

    delete(id) {
        return promiseMe(() => this.constructor.find(id).destroy())
    }

    find(id) {
        return promiseMe(() => new this({id}).fetch())
    }
}