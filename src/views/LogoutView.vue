<template>
  <main>
    <p class="text-white">You're currently logged in as: {{ route.query.user }}</p>
    <button @click="logoutUser" class="bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">Logout</button>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useDB } from '../components/dbConnection.js';

const { account } = useDB();

const route = useRoute();
const router = useRouter();

const logoutUser = async () => {
  const promise = await account.deleteSession('current');
  localStorage.removeItem('cookieFallback')
  router.push({
    name: 'home'
  })

}

</script>
