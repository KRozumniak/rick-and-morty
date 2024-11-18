import { createRouter, createWebHistory } from 'vue-router';
import CharactersPage from '../pages/CharactersPage.vue';
import CharacterPage from '../pages/CharacterPage.vue';
import ThePagination from '@/components/ThePagination.vue';
import FiltersContainer from '@/components/filters/FiltersContainer.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';

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
      component: FavoritesPage,
    },
    {
      path: '/favorites/:cId',
      name: 'favorite',
      component: CharacterPage,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  linkActiveClass: 'active',
});

export default router;
