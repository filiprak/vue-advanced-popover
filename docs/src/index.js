import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import './plugins/popover';
import App from './App.vue';

new Vue({
    el: '#app',
    vuetify: vuetify,
    router: router,
    render: h => h(App),
});
