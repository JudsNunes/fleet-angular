export interface PageParams {
  page: number;
  size: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const DEFAULT_PAGE_PARAMS: PageParams = {
  page: 0,
  size: 20,
  direction: 'ASC',
};
