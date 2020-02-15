module.exports = class NewSongFoundListener {
    async handle(event) {
        console.log('Hello from listener event', event)
    }
}