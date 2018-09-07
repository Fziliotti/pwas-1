import Vue from 'vue';
import Router from 'vue-router';
import Log from './components/Log.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'log',
      component: Log
    }
  ]
});