<script setup lang="ts">
import type { Character } from '@/models';
import TheButton from '../TheButton.vue';
import { useRouter } from 'vue-router';
import { useLocalStorageStore } from '@/stores/local-storage-store';
import { computed } from 'vue';

const { character } = defineProps<{
  character: Character;
}>();
const router = useRouter();

const store = useLocalStorageStore();

const buttonLabel = computed(() => {
  if (!!store.findCharById(character.id)) {
    return 'Remove from Favorites';
  }
  return 'Add to Favorites';
});

const navigateToCharacterPage = (charId: number) => {
  const currentPath = router.currentRoute.value.path;
  const newPath = `${currentPath}/${charId}`;
  router.push(newPath);
};
</script>

<template>
  <div class="card" @click="navigateToCharacterPage(character.id)">
    <div>
      <img :src="character.image" alt="Avatar" height="200px" width="200px" />
    </div>
    <div class="container">
      <h4>{{ character.name }}</h4>
      <p>{{ character.species }} - {{ character.status }}</p>
      <div class="action">
        <TheButton
          @click.stop="store.addOrRemoveCharacter(character)"
          :label="buttonLabel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 320px;
  width: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
  cursor: pointer;
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
