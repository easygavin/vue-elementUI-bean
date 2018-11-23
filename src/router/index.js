import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router);

// 框架基础页面
const login = r => require.ensure([], () => r(require('@/views/login.vue')), 'Basic');
const main = r => require.ensure([], () => r(require('@/views/main.vue')), 'Basic');

// 服务
const service = r => require.ensure([], () => r(require('@/views/service/index.vue')), 'Service');

const router = new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '',
      redirect: '/service'
    },
    {
      path: '/',
      component: main,
      children: [{
        path: '/service',
        component: service
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:', to, ', from:', from);
  next();
})

export default router
