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
import { useRouter } from 'vue-router';
import { useDB } from '../components/dbConnection.js';

const { account } = useDB();

const router = useRouter();
const addRecipe = () => {
  router.push({
    name: 'addRecipeView'
  })

}

const backToHome = () => {
  router.push({
    name: 'home'
  })
}

const goToAccount = async () => {
  try {
    if (localStorage.getItem('cookieFallback')) {
      const promise = await account.get();
      const user = promise.name;
      if (promise.$id) {
        router.push({
          name: 'logoutView',
          query: { user }
        })
      }
    }
    else {
      router.push({
        name: 'loginView'
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>