export interface Character {
  name: string;
  id: number;
  species: string;
  status: string;
  image: string;
}

export type ApiStatus = 'pending' | 'ready' | 'error';
export type FilterOption = 'all' | 'human' | 'animal' | 'alien';

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersApiResponse {
  info: PaginationInfo;
  results: Character[];
}

export interface ErrorResponse {
  error: string;
}

export function isErrorResponse(
  response: CharactersApiResponse | ErrorResponse
): response is ErrorResponse {
  return !!(response as ErrorResponse).error;
}