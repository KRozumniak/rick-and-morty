<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import FiltersBar from './FiltersBar.vue';
import { useCharactersStore } from '@/stores/characters-store';

const store = useCharactersStore();

const searchInput = ref('');
function submitSearch() {
  store.submitSearch(searchInput.value);
}

function setFilter(filterId: string) {
  store.setActiveFilter(filterId);
  searchInput.value = ''; //resetting search when filter changes
}
</script>

<template>
  <div class="filters">
    <div>
      <FiltersBar @set-filter="setFilter" />
    </div>
    <SearchBar v-model="searchInput" @submit-search="submitSearch" />
  </div>
</template>

<style scoped>
.filters {
  background-color: #eeeeee;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: auto;
  padding: 1rem 1.5rem;
  max-height: 67px;
}
</style>
