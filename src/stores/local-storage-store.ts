import type { Character } from '@/models';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const CHARS_KEY = '_chars';

export const useLocalStorageStore = defineStore('localStorageStore', () => {
  const favorites = ref<Character[]>([]);
  const favoritesCount = computed(() => favorites.value.length);

  if (localStorage.getItem(CHARS_KEY)) {
    favorites.value = JSON.parse(localStorage.getItem(CHARS_KEY)!);
  }

  watch(
    favorites,
    () => localStorage.setItem(CHARS_KEY, JSON.stringify(favorites.value)),
    { deep: true }
  );

  function findCharById(charId: number) {
    return favorites.value.find((char) => char.id === charId);
  }

  function addOrRemoveCharacter(character: Character) {
    const userExists = !!findCharById(character.id);
    if (userExists) {
      const filteredFavorites = favorites.value.filter(
        (char) => char.id !== character.id
      );
      favorites.value = filteredFavorites;
      return;
    }
    favorites.value.push(character);
  }

  return {
    favorites,
    favoritesCount,
    findCharById,
    addOrRemoveCharacter,
  };
});
