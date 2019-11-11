import Vue from 'vue';
import axios from 'axios';

window.axios = axios;

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('files', require('./components/Files').default);
Vue.component('player', require('./components/Player').default);
Vue.component('navigation-bar', require('./components/NavigationBar').default);

const app = new Vue({
    el: '#app'
})