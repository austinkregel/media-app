const jobs = app.fs.find_recursive(app.base_path('app/Jobs')).filter(file => file.endsWith('.js'))

const jobInstances = jobs.reduce((jobs, filePath) => {
    const job = require(filePath);
    const jobInstance = new job;

    return {
        ...jobs,
        [job.getQueueName]: filePath
    }
}, {});

module.exports =  class JobController {
    store(req, res) {
        const pathToJob = jobInstances[req.body.name];
console.log(jobInstances)
        if (!pathToJob) {
            res.status(404)
           return ({
                message: 'Nop'
            })
        }

        const job = require(pathToJob);

        const data = req.body.data || {};

        app.queue.dispatch(new job(data))

        return 'OK';
    }
};