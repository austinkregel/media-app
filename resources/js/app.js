import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Zondicon from 'vue-zondicons';
import routes from './routes';
import jQuery from 'jquery';
import torrentName from 'torrent-name-parser';
import io from 'socket.io-client';
import Vuex from 'vuex';
import video from 'video.js';
import 'videojs-chromecast';
import 'videojs-overlay';

Vue.use(Vuex);
window.socket = io(window.location.origin);

window.$ = window.jQuery = jQuery;
window.Bus = new Vue();
window.axios = axios;
window.Vue = Vue;
window.videojs = video;
window.videoOptions = (media) => ({
	autoplay: true,
	poster: media.backdrop,
	src: '/api/media/' + media.id,
	preload: 'auto',
	liveui: true
});

let torrentNameFix = (fileName) =>
	(torrentName(fileName).title || '')
		.replace(/^[\d]{1,5}\./, '')
		.replace(/\./g, ' ')
		.replace(/mp3$/, '')
		.trim()
		.split(' ')
		.filter((item) => item)
		.join(' ');

window.torrentNameFix = (fileName) =>
	Object.assign(torrentName(fileName), {
		title: torrentNameFix(fileName)
	});

Vue.use(VueRouter);
Vue.component('zondicon', Zondicon);

const files = require.context('./', true, /\.vue$/i);
files.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const router = new VueRouter({
	mode: 'history',
	routes
});

const state = require('./state').default;

const store = new Vuex.Store(state);

const app = new Vue({
	el: '#app',
	router,
	store
});
