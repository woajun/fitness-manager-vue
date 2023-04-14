import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/working/InWork.vue'),
  },
  {
    path: '/timer',
    name: 'timer',
    component: () => import('@/pages/working/InWork.vue'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/pages/report/CalendarReport.vue'),
  },
  {
    path: '/slider',
    name: 'slider',
    component: () => import('@/pages/test/SliderTest.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
