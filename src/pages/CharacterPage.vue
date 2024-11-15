<script setup lang="ts">
import TheButton from '@/components/TheButton.vue';
import { useLocalStorageStore } from '@/stores/local-storage-store';
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

const location = computed(() => store?.currentChar?.location.name || 'unknown');
const firstSeenEpisode = computed(() => {
  const episode = store?.currentChar?.episode[0];
  if (episode) {
    const episodeNumber = episode.split('/').pop();
    return episodeNumber;
  }
  return 'unknown';
});

onMounted(() => {
  store.fetchCharacter(cId.value);
});
</script>

<template>
  <div v-if="!store.currentChar">Loading...</div>
  <div v-else class="card">
    <div class="container">
      <h1>{{ store.currentChar.name }}</h1>
      <p>{{ store.currentChar.species }} - {{ store.currentChar.status }}</p>
      <p>Last known location: {{ location }}</p>
      <p>First seen in: {{ firstSeenEpisode }} episode</p>
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

.container p {
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

.action {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
}
</style>
