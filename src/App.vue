<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheLayout from './components/TheLayout.vue';
</script>

<template>
  <TheHeader />
  <RouterView name="filters" />
  <TheLayout>
    <RouterView />
  </TheLayout>
  <RouterView name="footer" />
</template>

<style scoped></style>
