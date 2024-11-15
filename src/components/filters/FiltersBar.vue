<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters-store';
import FilterButton from './FilterButton.vue';

const store = useCharactersStore();
const emit = defineEmits(['setFilter']);

const filters = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'human',
    label: 'Human',
  },
  {
    id: 'animal',
    label: 'Animal',
  },
  {
    id: 'alien',
    label: 'Alien',
  },
];
</script>

<template>
  <FilterButton
    v-for="filter in filters"
    :key="filter.id"
    :label="filter.label"
    @click="emit('setFilter', filter.id)"
    :class="['btn', { active: store.activeFilter === filter.id }]"
  />
</template>

<style scoped>
.btn:not(:last-child) {
  border-right: none;
}

.btn:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.btn:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.btn.active {
  background-color: #121212;
  color: white;
}
</style>
