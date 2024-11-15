<script setup lang="ts">
const { label } = defineProps<{ label: string }>();
</script>

<template>
  <button class="filter-button">{{ label }}</button>
</template>

<style scoped>
.filter-button {
  border: 1px solid #121212;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.filter-button:hover {
  color: #808080;
}
</style>
