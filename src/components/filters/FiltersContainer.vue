<script setup lang="ts">
import FiltersBar from './FiltersBar.vue';
import SearchBar from './SearchBar.vue';
</script>

<template>
  <div class="filters">
    <div>
      <FiltersBar />
    </div>
    <SearchBar />
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
