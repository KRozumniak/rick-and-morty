<script setup lang="ts">
import FilterButton from './FilterButton.vue';

const searchInput = defineModel<string>();
const emit = defineEmits(['submitSearch']);
</script>

<template>
  <input
    v-model.trim="searchInput"
    class="search"
    type="text"
    placeholder="Search by name..."
  />
  <FilterButton label="Search" class="btn" @click="emit('submitSearch')" />
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
