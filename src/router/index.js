import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import EditRecipeView from '../views/EditRecipeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipe/:name',
      name: 'recipeView',
      component: RecipeView
    },
    {
      path: '/recipe/new',
      name: 'addRecipeView',
      component: AddRecipeView
    },
    {
      path: '/recipe/edit',
      name: 'editRecipeView',
      component: EditRecipeView
    },
    {
      path: '/register',
      name: 'registerView',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logoutView',
      component: LogoutView
    }
  ]
})

export default router
