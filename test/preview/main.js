import Vue from 'vue';
import Preview from './Preview.vue';
import VPopoverPlugin from "../../src";

Vue.use(VPopoverPlugin);

new Vue({
    el: '#preview',
    render: h => h(Preview),
});
