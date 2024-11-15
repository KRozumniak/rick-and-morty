<script setup lang="ts">
import TheButton from '@/components/TheButton.vue';
import { useLocalStorageStore } from '@/hooks/use-local-storage';
import { useCharactersStore } from '@/stores/characters-store';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useCharactersStore();
const localStore = useLocalStorageStore();

const buttonLabel = computed(() => {
  if (!!store.currentChar && !!localStore.findCharById(store.currentChar.id)) {
    return 'Remove from Favorites';
  }
  return 'Add to Favorites';
});

const cId = computed(() => route.params.cId as string);

onMounted(() => {
  store.fetchCharacter(cId.value);
});
</script>

<template>
  <div v-if="!store.currentChar">Loading...</div>
  <div v-else class="card">
    <div class="container">
      <h4>{{ store.currentChar.name }}</h4>
      <p>{{ store.currentChar.species }} - {{ store.currentChar.status }}</p>
      <div class="action">
        <TheButton
          :label="buttonLabel"
          @click="localStore.addOrRemoveCharacter(store.currentChar)"
        />
      </div>
    </div>
    <div>
      <img
        :src="store.currentChar.image"
        alt="Avatar"
        height="300px"
        width="300px"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 300px;
  width: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

img {
  display: inline-block;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 0.5rem 0.5rem;
}

.action {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
}
</style>
