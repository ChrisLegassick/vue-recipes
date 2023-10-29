<template>
  <header class="fixed m-5 z-10">
    <BackBtn />
  </header>
  <main class="text-white">
    <img class="sticky top-0 object-cover h-96 w-full" src="../assets/temp.jpg" alt="">
    <div class="rounded-t-3xl relative -mt-8 bg-slate-800 z-20">
      <div class="px-5 pt-5">
        <h2 class="font-bold text-xl">{{ recipeName }}</h2>
        <p class="font-extralight">By {{ username }}</p>
        <h3 class="text-lg pt-4">Ingredients:</h3>
        <ul>
          <li v-for="ingredient in recipeIngredients" class="bg-slate-700 my-3 p-3 rounded-md">{{ ingredient }}</li>
        </ul>
        <h3 class="text-lg pt-4">Instructions:</h3>
        <ul>
          <li v-for="instructions in recipeInstructions" class="bg-slate-700 my-3 p-3 rounded-md ">{{
            instructions }}</li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center py-4">
      <button @click="deleteRecipe" class="rounded-lg bg-red-700 hover:bg-red-800 px-3 py-1 flex items-center mr-8">
        <TrashIcon class="h-4 w-4 text-white mr-1" />
        Delete
      </button>
      <button @click="editRecipe" class="flex items-center bg-white hover:opacity-90 rounded-lg text-blue-500 px-3 py-1">
        <PencilSquareIcon class="h-4 w-4 text-blue-500 mr-1" />
        Edit
      </button>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from '../components/api.js';
import BackBtn from './backBtn.vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

const { databaseID, collectionID, databases } = api();

const recipeName = ref("");
const recipeIngredients = ref([]);
const recipeInstructions = ref([]);
const username = ref("");

const route = useRoute();

const getRecipeData = async () => {
  try {
    const recipeData = await databases.getDocument(databaseID, collectionID, `${route.query.id}`);
    recipeName.value = recipeData.name;
    recipeIngredients.value = recipeData.ingredients;
    recipeInstructions.value = recipeData.instructions;
    username.value = recipeData.createdBy;
    return recipeData;
  } catch (error) {
    console.log(error)
  }
};

const recipeData = await getRecipeData();

const router = useRouter();
const editRecipe = () => {
  router.push({
    name: 'editRecipeView',
    query: {
      id: route.query.id
    }
  })
}

const deleteRecipe = async () => {
  try {
    const promise = await databases.deleteDocument(databaseID, collectionID, `${route.query.id}`);
    router.push({
      name: 'home'
    })
    console.log(promise)
  } catch (error) {
    console.log(error)
  }
}
</script>