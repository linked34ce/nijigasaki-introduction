import { createRouter, createWebHistory } from 'vue-router';
import CharactersIntroduction from '@/views/CharactersIntroduction.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'nijigasaki-introduction',
      component: CharactersIntroduction
    }
  ]
});

export default router;
