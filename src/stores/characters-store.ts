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
  const errorMessage = ref('Request error');
  const query = reactive(new URLSearchParams());

  const characters = ref<Character[]>([]);
  const currentChar = ref<Character | null>(null);

  // pagination logic
  const paginationInfo = ref<PaginationInfo>(initialPagination);
  const currentPage = ref(1);

  function resetCurrentPage() {
    currentPage.value = 1;
  }

  function loadNextPage() {
    ++currentPage.value;
    const nextPageUrl = paginationInfo.value.next || '';
    fetchCharacters({ pageUrl: nextPageUrl });
  }

  function loadPrevPage() {
    --currentPage.value;
    const prevPageUrl = paginationInfo.value.prev || '';
    fetchCharacters({ pageUrl: prevPageUrl });
  }

  // filter logic
  const activeFilter = ref('all');

  function updateFilterParam(filterId: string) {
    if (filterId && filterId !== 'all') {
      query.set('species', filterId);
    } else if (query.has('species') && filterId === 'all') {
      query.delete('species');
    }
  }

  function updateSearchParam(value: string) {
    if (value) {
      query.set('name', value);
    } else if (query.has('name')) {
      query.delete('name');
    }
  }

  function setActiveFilter(filterId: string) {
    activeFilter.value = filterId;
    updateFilterParam(filterId);
    resetSearch();
    resetCurrentPage();
    fetchCharacters({ query: query.toString() });
  }

  function resetSearch() {
    updateSearchParam('');
  }

  function submitSearch(value: string) {
    updateSearchParam(value);
    resetCurrentPage();
    fetchCharacters({ query: query.toString() });
  }

  // api logic
  const fetchCharacters = async ({ pageUrl = '', query = '' }) => {
    charactersStatus.value = 'pending';
    try {
      const { data, statusCode } = await service.getCharacters(pageUrl, query);
      if (isErrorResponse(data)) {
        const message = statusCode === 404 ? 'Not found' : 'Request Error';
        throw new Error(message);
      }
      paginationInfo.value = data.info;
      characters.value = data.results;
      charactersStatus.value = 'ready';
    } catch (e) {
      errorMessage.value = (e as Error).toString();
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
    errorMessage,
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
});
