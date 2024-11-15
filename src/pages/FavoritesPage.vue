<script setup lang="ts">
import CardList from '@/components/cards/CardList.vue';
import { useLocalStorageStore } from '@/hooks/use-local-storage';

const store = useLocalStorageStore();
</script>

<template>
  <main>
    <CardList v-if="!!store.favorites.length" :characters="store.favorites" />
    <p v-else>No cards</p>
  </main>
</template>

<style></style>
