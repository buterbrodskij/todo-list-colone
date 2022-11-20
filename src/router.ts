import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'today',
    path: '/today',
    component: import('@/pages/Today.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;
