<script setup lang="ts">
const { label } = defineProps<{ label: string }>();
</script>

<template>
  <button class="btn">{{ label }}</button>
</template>

<style scoped>
.btn {
  background-color: #121212;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
}

.btn:hover {
  background-color: #444;
}
</style>
