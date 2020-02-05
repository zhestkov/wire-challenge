export interface IPagination {
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  offset: number;
  limit: number;
}
