import { createRouter, createWebHistory } from 'vue-router';
import CharactersPage from '../pages/CharactersPage.vue';
import CharacterPage from '../pages/CharacterPage.vue';
import ThePagination from '@/components/ThePagination.vue';
import FiltersContainer from '@/components/filters/FiltersContainer.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/characters' },
    {
      path: '/characters',
      name: 'characters',
      components: {
        filters: FiltersContainer,
        default: CharactersPage,
        footer: ThePagination,
      },
    },
    {
      path: '/characters/:cId',
      name: 'character',
      component: CharacterPage,
      props: true,
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/FavoritesPage.vue'),
    },
  ],
  linkActiveClass: 'active',
});

export default router;
