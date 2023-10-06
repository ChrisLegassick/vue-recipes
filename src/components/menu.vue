<template>
  <div class="fixed bottom-0 left-0 right-0 bg-slate-900 max-w-sm mx-auto z-50">
    <div class="flex justify-around flex-initial">
      <button @click="backToHome" class="p-4">
        <HomeIcon class="h-7 w-7 text-blue-500" />
      </button>
      <button @click="addRecipe" class="p-4">
        <PlusCircleIcon class="h-7 w-7 text-blue-500" />
      </button>
      <button @click="goToAccount" class="p-4">
        <UserIcon class="h-7 w-7 text-blue-500" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router';
import { useDB } from '../components/dbConnection.js';

const { account } = useDB();

const route = useRoute();

const router = useRouter();
const addRecipe = (e) => {
  e.preventDefault();
  if (route.query.loggedIn) {
    router.push({
      name: 'addRecipeView'
    })
  } else {
    window.alert('You must be logged in to create a recipe!')
  }
}

const backToHome = () => {
  router.push({
    name: 'home'
  })
}

const goToAccount = async () => {
  if (route.query.loggedIn) {
    const promise = await account.get();
    const user = promise.name
    router.push({
      name: 'logoutView',
      query: {
        user: user
      }
    })
  } else {
    router.push({
      name: 'loginView'
    })
  }
}
</script>

<style scoped></style>