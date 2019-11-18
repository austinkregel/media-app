export default {
	state: {
		files: [],
		genres: []
	},
	mutations: {
		setFiles(state, { files }) {
			state.files = files;
		},

		setGenres(state, { genres }) {
			state.genres = genres;
		}
	},
	getters: {
		files(state, getters) {
			return state.files;
		},
		genres(state, getters) {
			return state.genres;
		}
	}
};
