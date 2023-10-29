<template>
  <header>
    <h1 class="text-white p-5 font-bold text-xl">Hello {{ username }}</h1>
  </header>
  <main class="px-5">
    <form class="flex">
      <input type="text" name="search" id="search" placeholder="Search for a recipe" v-model="searchText"
        class="border-solid rounded-l-lg border-white p-1 px-2 flex-1 bg-slate-700">
      <button @click="searchRecipes" class="rounded-r-lg bg-slate-500 text-white px-3 py-1">Search</button>
    </form>
  </main>
  <div class="grid grid-cols-2 gap-4 p-5">
    <Recipe v-for="recipe in recipes" @click="viewRecipe(recipe)" :recipe="recipe" />
  </div>
</template>

<script setup>
import Recipe from '../components/Recipe.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../components/api.js';

const { databaseID, collectionID, databases, Query, account } = api();

const searchText = ref('');
const recipes = ref([]);
const username = ref('');

const getUser = async () => {
  if (localStorage.getItem('cookieFallback')) {
    const promise = await account.get();
    username.value = promise.name;
  }
}

const getAllRecipes = async () => {
  const promise = await databases.listDocuments(databaseID, collectionID);
  const data = promise.documents;
  recipes.value = data;
}

const searchRecipes = async (e) => {
  e.preventDefault();
  if (searchText.value !== "") {
    const promise = await databases.listDocuments(databaseID, collectionID, [
      Query.search('name', `${searchText.value}`)
    ]);
    const data = promise.documents;
    recipes.value = data;
    searchText.value = "";
  } else {
    getAllRecipes();
  }
}

onMounted(() => {
  getAllRecipes();
  getUser();
})

const route = useRoute();
const router = useRouter();
const viewRecipe = (recipe) => {
  const name = recipe.name;
  router.push({
    name: 'recipeView',
    params: { name: name },
    query: {
      id: recipe.$id
    }
  })
}

</script>

<style scoped></style>