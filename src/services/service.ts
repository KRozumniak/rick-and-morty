import type { Character, CharactersApiResponse } from '@/models';
import { Axios, type AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://rickandmortyapi.com/api',
};

export class CharactersService {
  readonly axios: Axios;

  constructor() {
    this.axios = new Axios(config);
  }

  async getCharacters(pageUrl?: string, query?: string) {
    const uriWithQuery = query ? `/character?${query}` : `/character`;
    const uri = pageUrl ? pageUrl : uriWithQuery;
    const response = await this.axios.get(uri);
    const data = this.parseData<CharactersApiResponse | { error: string }>(
      response.data
    );
    return { data, statusCode: response.status };
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
