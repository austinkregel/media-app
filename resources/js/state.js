export default {
	state: {
		files: [],
		genres: [],
		media: null
	},
	mutations: {
		setFiles(state, { files }) {
			state.files = files;
		},

		setGenres(state, { genres }) {
			state.genres = genres;
		},

		setMedia(state, { media }) {
			state.media = media;
		}
	},
	getters: {
		files(state, getters) {
			return state.files;
		},
		genres(state, getters) {
			return state.genres;
		},
		media(state, getters) {
			return state.media;
		}
	}
};
