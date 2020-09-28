import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../views/Demo';
import Docs from '../views/Docs';
import Playground from '../views/Playground';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', component: Demo},
        {path: '/docs', component: Docs},
        {path: '/playground', component: Playground},
    ],
});
