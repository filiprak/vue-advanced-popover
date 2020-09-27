import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import Popover from "../src";

Vue.use(Popover);

new Vue({
    el: '#app',
    vuetify: vuetify,
    render: h => h(App),
});
