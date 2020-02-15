const Queue = require('../../bootstrap/Queue');
const { setQueues } = require('bull-board');

module.exports = class QueueServiceProvider {
	register() {
        const queue = new Queue;
        app.queue = queue;

        const jobs = app.fs.find_recursive(app.base_path('app/Jobs')).filter(file => file.endsWith('.js'))

        setQueues(jobs.map((filePath) => {
            const job = require(filePath);
            const jobInstance = new job;

            if (jobInstance.___abstract) {
                return false;
            }

            return app.queue.register(job.getQueueName, jobInstance.handle);
        }).filter(i => i));
	}
};
