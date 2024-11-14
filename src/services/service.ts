import type { Character, CharactersApiResponse } from '@/models';
import { Axios, type AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://rickandmortyapi.com/api',
};

export class CharactersService {
  readonly axios: Axios;

  constructor() {
    console.log('Init constructor');
    this.axios = new Axios(config);
  }

  //original code
  // async getCharacters(pageUrl?: string, speciesParam?: string) {
  //   const initialUri = `/character${speciesParam || ''}`;
  //   const uri = pageUrl && !speciesParam ? pageUrl : initialUri;
  async getCharacters(pageUrl?: string, query?: string) {
    console.log('query: ', query);
    const uriWithQuery = query ? `/character?${query}` : `/character`;
    console.log('uriWithQuery: ', uriWithQuery);
    const uri = pageUrl ? pageUrl : uriWithQuery;
    console.log('uri: ', uri);
    const response = await this.axios.get(uri);
    const jsonData = this.parseData<CharactersApiResponse | { error: string }>(
      response.data
    );
    return jsonData;
  }

  async getCharacter(id: string) {
    if (!id) {
      console.error('Character id was not provided');
      return null;
    }
    const response = await this.axios.get('/character/' + id);
    const jsonData = this.parseData<Character>(response.data);
    return jsonData;
  }

  private parseData<T>(data: string) {
    return JSON.parse(data) as T;
  }
}
