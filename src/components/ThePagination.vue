<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useCharactersStore();

const prevActionLabel = '<< Prev';
const nextActionLabel = 'Next >>';

const isPrevDisabled = computed(() => !store.paginationInfo.prev);
const isNextDisabled = computed(() => !store.paginationInfo.next);

const handlePrev = () => {
  if (!isPrevDisabled.value) {
    store.loadPrevPage();
  }
};

const handleNext = () => {
  if (!isNextDisabled.value) {
    store.loadNextPage();
  }
};
</script>

<template>
  <footer class="footer" v-show="store.charactersStatus === 'ready'">
    <div>Page {{ store.currentPage }} of {{ store.paginationInfo.pages }}</div>
    <div class="actions">
      <span
        role="button"
        :class="['action', { 'action--disabled': isPrevDisabled }]"
        @click="handlePrev"
        >{{ prevActionLabel }}</span
      >
      <span
        role="button"
        :class="['action', { 'action--disabled': isNextDisabled }]"
        @click="handleNext"
        >{{ nextActionLabel }}</span
      >
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2.5rem;
  width: auto;
  padding: 1rem 1.5rem;
}

.actions {
  color: #121212;
  display: flex;
  gap: 0.5rem;
}

.action {
  cursor: pointer;
}

.action--disabled {
  cursor: default;
  color: darkgray;
}
</style>
