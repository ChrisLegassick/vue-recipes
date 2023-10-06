<template>
  <div>
    <img src="../assets/temp.jpg" alt="">
    <p class="text-white">{{ recipe.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object
})
</script>

<style scoped></style>