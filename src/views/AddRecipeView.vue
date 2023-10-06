<template>
  <header class="p-5">
    <BackBtn />
  </header>
  <div>
    <h2 class="text-white text-lg px-5">Add a new recipe</h2>
    <form @submit.prevent class="text-white px-5">
      <input type="text" name="name" id="name" placeholder="Recipe name..." v-model="recipe.name"
        class="bg-slate-700 my-3 p-3 rounded-md w-full">
      <div id="ingredientsContainer" class="flex flex-col">
        <input type="text" name="ingredients" placeholder="Recipe ingredient" v-model="recipe.ingredients[0]"
          class="bg-slate-700 my-3 p-3 rounded-md">
        <input v-for="i in recipe.ingredientsIndex" type="text" name="ingredients" placeholder="Recipe ingredient"
          v-model="recipe.ingredients[i]" class="bg-slate-700 my-3 p-3 rounded-md">
        <button @click="addIngredient"
          class="py-4 mb-4 mt-2 bg-slate-500 hover:bg-slate-600 flex items-center justify-center">
          <PlusIcon class="h-4 w-4 text-white mr-1" />
          Add Ingredient
        </button>
      </div>
      <div id="instructionsContainer" class="flex flex-col">
        <input type="text" name="instructions" placeholder="Recipe instruction" v-model="recipe.instructions[0]"
          class="bg-slate-700 my-3 p-3 rounded-md">
        <input v-for="i in recipe.instructionsIndex" type="text" name="instructions" placeholder="Recipe instruction"
          v-model="recipe.instructions[i]" class="bg-slate-700 my-3 p-3 rounded-md">
        <button @click="addInstruction"
          class="py-4 mb-4 mt-2 bg-slate-500 hover:bg-slate-600 flex items-center justify-center">
          <PlusIcon class="h-4 w-4 text-white mr-1" />
          Add Instruction
        </button>
      </div>
      <button @click="saveRecipe" type="submit"
        class="flex items-center bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">
        <PlusIcon class="h-4 w-4 text-white mr-1" />
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDB } from '../components/dbConnection.js';
import BackBtn from '../components/backBtn.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';

const { databaseID, collectionID, databases, ID, account } = useDB();

const username = ref('');

const getUser = async () => {
  const promise = await account.get();
  username.value = promise.name;
}

onMounted(() => {
  getUser();
})

const recipe = ref({
  name: "",
  ingredients: [],
  instructions: [],
  ingredientsIndex: 0,
  instructionsIndex: 0,
});

const addIngredient = () => {
  recipe.value.ingredientsIndex++;
}

const addInstruction = () => {
  recipe.value.instructionsIndex++;
}


const saveRecipe = async () => {
  try {
    if (recipe.value.name === "" || recipe.value.ingredients < 1 || recipe.value.instructions < 1) {
      console.log("Empty fields");
      return;
    }
    const data = await databases.createDocument(databaseID, collectionID, ID.unique(), {
      name: recipe.value.name,
      ingredients: recipe.value.ingredients,
      instructions: recipe.value.instructions,
      createdBy: username.value
    });
    viewRecipe(data);
  } catch (error) {
    console.log(error)
  }
}

const router = useRouter();
const viewRecipe = (data) => {
  const name = data.name;
  router.push({
    name: 'recipeView',
    params: { name: name },
    query: {
      id: data.$id
    }
  })
}


</script>

<style scoped></style>