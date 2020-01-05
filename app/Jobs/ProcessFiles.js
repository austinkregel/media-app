module.exports = class ProcessFiles {
    static getQueueName() {
        return 'process:file';
    }

    async handle() {
        console.log('hello from queue!');

    }

    toJson() {
        return {}
    }
}