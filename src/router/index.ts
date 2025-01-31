// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import CurrentWeather from '@/views/CurrentWeather.vue';
import HourlyForecast from '@/views/HourlyForecast.vue';
import DailyForecast from '@/views/DailyForecast.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/current'
  },
  {
    path: '/current',
    component: CurrentWeather
  },
  {
    path: '/hourly',
    component: HourlyForecast
  },
  {
    path: '/daily',
    component: DailyForecast
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;