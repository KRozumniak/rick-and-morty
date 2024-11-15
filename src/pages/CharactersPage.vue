<script setup lang="ts">
import CardList from '@/components/cards/CardList.vue';
import { useCharactersStore } from '@/stores/characters-store';
import { computed, onMounted } from 'vue';

const store = useCharactersStore();

const isLoading = computed(() => store.charactersStatus === 'pending');
const isError = computed(() => store.charactersStatus === 'error');

onMounted(() => {
  store.fetchCharacters({});
});
</script>

<template>
  <main>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">{{ store.errorMessage }}</p>
    <CardList v-else :characters="store.characters" />
  </main>
</template>
