import Vue from 'vue';
import Router from 'vue-router';
import layout from '../layout';
import login from '../views/Login.vue';
import profile from '../views/system/profile/index.vue';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: layout,
      children: [
        {
          path: '/system/profile/index',
          name: '个人中心',
          component: profile,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
});
