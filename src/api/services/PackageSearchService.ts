import axios, { AxiosPromise } from 'axios';

interface ISearchRequest {
  query: string;
  perPage: number;
  page: number;
  sortField: string;
}

const SEARCH_API_URI = 'https://libraries.io/api/bower-search';

export default class PackageSearchService {
  static getPackages({ query, perPage, page, sortField }: ISearchRequest): AxiosPromise {
    return axios.get(SEARCH_API_URI, {
      params: {
        q: query,
        per_page: perPage,
        page,
        sort: sortField
      }
    })
  }
}
