import axios, { AxiosResponse } from 'axios';
import { IPackage } from '../../../shared/interfaces/IPackage';
import { IPagination } from '../../../shared/interfaces/IPagination';
import { Dispatch } from 'redux';
import {TRootState} from '../index';
import {ISetLoadingAction, setLoading} from '../loading';
import { SORT_ITEMS } from '../../../shared/interfaces/ISort';

// Attention!
// Libraries.io doesn't provide a proper Access-Control-Expose-Headers header
// So it's impossible to get value of  *total* header
const TOTAL_PAGES = 12;
const PACKAGES_PER_PAGE = 5;

export interface ISearchFilter extends IPagination {
  query: string;
}

// state interface
export interface ISearchState {
  packages: IPackage[];
  filter: ISearchFilter;
  error: Error | null;
}

// action types
export const SET_PACKAGES = 'SET_PACKAGES';
export const SET_ERROR = 'SET_ERROR';
export const SET_FILTER = 'SET_FILTER';

// action interfaces
interface ISetPackagesAction {
  type: typeof SET_PACKAGES;
  payload: IPackage[];
  meta?: {
    throttle: number;
  }
}

interface ISetFilterAction {
  type: typeof SET_FILTER;
  payload: ISearchFilter;
}

interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: Error;
}

export type ISearchActionTypes = ISetPackagesAction | ISetFilterAction | ISetErrorAction | ISetLoadingAction;

// action creators
export const setPackages = (packages: IPackage[]): ISearchActionTypes => ({
  type: SET_PACKAGES,
  payload: packages
});

export const setFilter = (filter: ISearchFilter): ISearchActionTypes => ({
  type: SET_FILTER,
  payload: filter
});

export const setError = (err: Error): ISearchActionTypes => ({
  type: SET_ERROR,
  payload: err
});

// TODO: add throttling
export const  fetchPackages =
  ({ query, limit = PACKAGES_PER_PAGE, offset, page, sortField, total = TOTAL_PAGES}: ISearchFilter): any =>
    async (dispatch: Dispatch<ISearchActionTypes>, getState: () => TRootState) => {
  const PAGE_NUMBER  = offset
    ? Math.floor(offset / limit)
    : page ? page : 1;
  try {
    dispatch(setLoading(true));
    const res: AxiosResponse = await axios.get<IPackage>(`${process.env.REACT_APP_BASE_API_URI}/bower-search`, {
      params: {
        q: query,
        per_page: limit,
        page: PAGE_NUMBER,
        ...(getState().search.filter.sortField === SORT_ITEMS.stars.value
          && { sort: getState().search.filter.sortField }),
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    dispatch((setFilter({
      ...getState().search.filter,
      query,
      limit,
      total,
      ...(offset && { offset }),
      ...(page && { page }),
      ...(sortField && { sortField }),
    })));

    dispatch(setPackages(res.data));
    dispatch(setLoading(false));
    return await Promise.resolve(res.data);
  } catch(err) {
    console.error(err);
    dispatch(setError(err));
    return await Promise.resolve(null);
  }
};

const initialState: ISearchState = {
  packages: [],
  filter: {
    query: '',
    sortField: '',
    offset: 0,
    limit: PACKAGES_PER_PAGE,
    page: 1,
    total: 12
  },
  error: null
};

export default (state: ISearchState = initialState, action: ISearchActionTypes): ISearchState => {
  switch(action.type) {
    case SET_PACKAGES:
      return {
        ...state,
        packages: action.payload
      };
      case SET_FILTER:
        return {
          ...state,
          filter: action.payload
        };
    case SET_ERROR:
      return {
        ...state,
        packages: [],
        error: action.payload
      };
    default:
      return state;
  }
};
