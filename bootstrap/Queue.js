const bull = require('bull');

module.exports = class Queue {
    constructor() {
        this.queues = {};
    }

    dispatch(job, { priority = 'normal', ttl = 60000, delay = 400 } = {}) {
        if (typeof job.constructor.getQueueName !== 'function') {
            throw new Error('You must defined a getQueueName method so the dispatcher knows where to put the job.');
        }

        if (typeof this.queues[job.constructor.getQueueName()] === 'undefined') {
            throw new Error('There is no queue ['+ job.getQueueName()+'], please register a job!')
        }

        if (typeof job.toJson !== 'function') {
            throw new Error('You must define a toJson method so the dispatcher can put data into the queue.');
        }

        this.queues[job.constructor.getQueueName()].add(job);
    }

    register(name, action) {
        this.queues[name] = new bull(name);
        this.queues[name].process(async (job, done) => {
            if (typeof job.___abstract !== 'undefined') {
                done();
                return;
            }

            if (typeof action !== 'function') {
                throw new Error("A job pushed to the [" + name + "] queue isnt a job that can be handled.");
                return;
            }

            action.bind(job.data);

            try {
                job.progress(0);
                await action({ job, name });
                job.progress(100);
            } catch (e) {
                console.log('Error in the queue:', e);
            } finally {
                done();
            }
        });
        return this.queues[name];
    }
}