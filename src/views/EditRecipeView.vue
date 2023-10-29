<template>
  <header class="p-5">
    <BackBtn />
  </header>
  <div>
    <h2 class="text-white text-lg px-5">Update recipe</h2>
    <form @submit.prevent class="text-white px-5">
      <input type="text" name="name" id="name" placeholder="Recipe name..." v-model="recipe.name"
        class="bg-slate-700 my-3 p-3 rounded-md w-full">
      <div id="ingredientsContainer" class="flex flex-col">
        <input v-for="i in recipe.ingredientsIndex" type="text" name="ingredients" placeholder="Recipe ingredient"
          v-model="recipe.ingredients[i - 1]" class="bg-slate-700 my-3 p-3 rounded-md">
        <button @click="addIngredient"
          class="py-4 mb-4 mt-2 bg-slate-500 hover:bg-slate-600 flex items-center justify-center">
          <PlusIcon class="h-4 w-4 text-white mr-1" />
          Add Ingredient
        </button>
      </div>
      <div id="instructionsContainer" class="flex flex-col">
        <input v-for="i in recipe.instructionsIndex" type="text" name="instructions" placeholder="Recipe instruction"
          v-model="recipe.instructions[i - 1]" class="bg-slate-700 my-3 p-3 rounded-md">
        <button @click="addInstruction"
          class="py-4 mt-2 mb-4 bg-slate-500 hover:bg-slate-600 flex items-center justify-center">
          <PlusIcon class="h-4 w-4 text-white mr-1" />
          Add Instruction
        </button>
      </div>
      <button @click="updateRecipe" type="submit"
        class="flex items-center bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">
        <PlusIcon class="h-4 w-4 text-white mr-1" />
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { api } from '../components/api.js';
import BackBtn from '../components/backBtn.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';

const { databaseID, collectionID, databases } = api();

const recipe = ref({
  name: "",
  ingredients: [],
  instructions: [],
  ingredientsIndex: 0,
  instructionsIndex: 0,
});

const route = useRoute();
const getRecipeData = async () => {
  try {
    const recipeData = await databases.getDocument(databaseID, collectionID, `${route.query.id}`);
    const { name, ingredients, instructions } = recipeData;
    recipe.value.name = name;

    const ingredientsArr = ingredients.map(ingredient => {
      recipe.value.ingredients = [...recipe.value.ingredients, ingredient]
      recipe.value.ingredientsIndex++;
    })

    const instructionsArr = instructions.map(instruction => {
      recipe.value.instructions = [...recipe.value.instructions, instruction]
      recipe.value.instructionsIndex++;
    })
  } catch (error) {
    console.log(error)
  }
};

const addIngredient = () => {
  recipe.value.ingredientsIndex++;
}

const addInstruction = () => {
  recipe.value.instructionsIndex++;
}

const updateRecipe = async () => {
  try {
    const data = await databases.updateDocument(databaseID, collectionID, `${route.query.id}`, {
      name: recipe.value.name,
      ingredients: recipe.value.ingredients,
      instructions: recipe.value.instructions
    });
    viewRecipe(recipe);
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getRecipeData();
})

const router = useRouter();
const viewRecipe = (recipe) => {
  const name = recipe.value.name;
  router.push({
    name: 'recipeView',
    params: { name: name },
    query: {
      id: route.query.id
    }
  })
}

</script>

<style scoped></style>