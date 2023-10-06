<script setup>
import { RouterView } from 'vue-router'
import Menu from './components/menu.vue';
</script>

<template>
  <div class="max-w-sm mx-auto bg-slate-800 min-h-screen">
    <div>
      <RouterView />
    </div>
    <div class="py-10">
      <Menu />
    </div>
  </div>
</template>

<style scoped></style>
