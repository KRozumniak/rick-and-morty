import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  isErrorResponse,
  type ApiStatus,
  type Character,
  type PaginationInfo,
} from '@/models';
import { CharactersService } from '@/services/service';

const initialPagination = {
  pages: 0,
  count: 0,
  next: null,
  prev: null,
};

export const useCharactersStore = defineStore('charactersStore', () => {
  const service = new CharactersService();

  const charactersStatus = ref<ApiStatus>('pending');

  const query = reactive(new URLSearchParams());

  const activeFilter = ref('all');
  const setActiveFilter = (filterId: string) => {
    activeFilter.value = filterId;

    updateFilterSearchParam(filterId);
    resetCurrentPage();
    fetchCharacters({ query: query.toString() });
  };

  const submitSearch = (value: string) => {
    if (value) {
      query.set('name', value);
    } else if (query.has('name')) {
      query.delete('name');
    }
    console.log(query);
    resetCurrentPage();
    fetchCharacters({ query: query.toString() });
  };

  const characters = ref<Character[]>([]);
  const currentChar = ref<Character | null>(null);

  const paginationInfo = ref<PaginationInfo>(initialPagination);

  const currentPage = ref(1);
  const resetCurrentPage = () => {
    currentPage.value = 1;
  };

  const loadNextPage = async () => {
    ++currentPage.value;
    const nextPageUrl = paginationInfo.value.next || '';
    fetchCharacters({ pageUrl: nextPageUrl });
  };

  const loadPrevPage = async () => {
    --currentPage.value;
    const prevPageUrl = paginationInfo.value.prev || '';
    fetchCharacters({ pageUrl: prevPageUrl });
  };

  const fetchCharacters = async ({ pageUrl = '', query = '' }) => {
    charactersStatus.value = 'pending';
    try {
      const data = await service.getCharacters(pageUrl, query);
      if (isErrorResponse(data)) {
        throw new Error(data.error);
      }
      paginationInfo.value = data.info;
      characters.value = data.results;
      charactersStatus.value = 'ready';
    } catch (e) {
      console.error(e);
      charactersStatus.value = 'error';
    }
  };

  const fetchCharacter = async (charId: string) => {
    if (currentChar.value) {
      // resetting prev loaded character
      currentChar.value = null;
    }
    const data = await service.getCharacter(charId);
    currentChar.value = data;
  };

  return {
    characters,
    charactersStatus,
    currentChar,
    currentPage,
    fetchCharacters,
    resetCurrentPage,
    fetchCharacter,
    setActiveFilter,
    loadNextPage,
    loadPrevPage,
    paginationInfo,
    activeFilter,
    submitSearch,
  };

  function updateFilterSearchParam(filterId: string) {
    if (filterId && filterId !== 'all') {
      query.set('species', filterId);
    } else if (query.has('species') && filterId === 'all') {
      query.delete('species');
    }
  }
});
