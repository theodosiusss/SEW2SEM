import { createRouter, createWebHistory } from 'vue-router'

import AboutView from "@/views/AboutView.vue";
import ImpressumView from "@/views/ImpressumView.vue";
import RecipeSearchView from "@/views/RecipeSearchView.vue";
import RecipeView from "@/views/RecipeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeSearchView,
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component : RecipeView,
      props: true,
    },
    {
      path : "/impressum",
      name : "impressum",
      component : ImpressumView,
    },
  ],
})

export default router;
