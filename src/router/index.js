import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:username',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
    props: {
      error: 'Page',
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
