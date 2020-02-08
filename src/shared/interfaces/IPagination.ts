export interface IPagination {
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  offset?: number;
  page?: number;
  limit?: number;
  total?: number;
}
