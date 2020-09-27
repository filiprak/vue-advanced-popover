import Vue from 'vue';
import App from './App.vue';
import Popover from "../src";

Vue.use(Popover);

new Vue({
    el: '#app',
    render: h => h(App),
});
