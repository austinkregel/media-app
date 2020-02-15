module.exports = class Event {
    static get class() {
        let instance = new this;
        return instance.constructor.name
    }
}