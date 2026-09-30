export interface PaginationRequest {
  Search?: string;
  Sort?: string;
  Page: number;
  Per_Page: number;
}

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
