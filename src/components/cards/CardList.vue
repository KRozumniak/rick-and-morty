<script setup lang="ts">
import type { Character } from '@/models';
import CardItem from './CardItem.vue';

interface ListProps {
  characters: Character[];
}

const { characters } = defineProps<ListProps>();
</script>

<template>
  <div class="container">
    <CardItem v-for="char in characters" :key="char.id" :character="char" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>
