<template>
  <div>
    <Suspense>
      <AsyncRecipeView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncRecipeView from '../components/AsyncRecipeView.vue';


</script>

<style scoped></style>