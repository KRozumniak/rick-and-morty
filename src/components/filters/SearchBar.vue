<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters-store';
import FilterButton from './FilterButton.vue';

const store = useCharactersStore();
const searchInput = defineModel<string>({
  default: '',
});

const submitSearch = () => {
  console.log('searchInput: ', searchInput.value);
  const value = searchInput.value.trim();
  store.submitSearch(value);
  // searchInput.value = '';
};
</script>

<template>
  <input
    v-model="searchInput"
    class="search"
    type="text"
    placeholder="Search by name..."
  />
  <FilterButton label="Search" class="btn" @click="submitSearch" />
</template>

<style scoped>
.search {
  padding: 7px;
  margin-left: 1rem;
  font-size: 14px;
  border: 1px solid #121212;
  outline: none;
}

.btn {
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.btn:active {
  background-color: #121212;
  color: white;
}
</style>
