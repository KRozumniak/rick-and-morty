<script setup lang="ts">
import { useLocalStorageStore } from '@/stores/local-storage-store';
import { RouterLink } from 'vue-router';
const store = useLocalStorageStore();
</script>

<template>
  <header class="header">
    <nav class="nav-bar">
      <RouterLink to="/characters">Characters</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
    <div class="favs">
      <i class="pi pi-heart"></i
      ><span class="favs__count">{{ store.favoritesCount }}</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #121212;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
}

.nav-bar {
  display: flex;
  gap: 16px;
}

a {
  text-decoration: none;
  color: grey;
  cursor: pointer;
  padding: 1rem 1.5rem;
}

.active {
  color: white;
}

.favs {
  padding: 8px 8px 0;
  color: white;
  padding: 1rem 1.5rem;
}

.favs__count {
  display: inline-block;
  margin-left: 8px;
}
</style>
