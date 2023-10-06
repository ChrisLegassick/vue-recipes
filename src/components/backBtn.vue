<template>
  <button @click="goBack">
    <ArrowLeftCircleIcon class="h-8 w-8 text-white hover:opacity-90" />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter();
const goBack = () => {
  router.back()
}
</script>