import axios, { AxiosResponse } from 'axios';
import { IPackage } from '../../shared/interfaces/IPackage';
import { IPagination } from '../../shared/interfaces/IPagination';
import { Dispatch } from 'redux';

const PACKAGES_PER_PAGE = 5;

export interface ISearchFilter extends IPagination {
  query: string;
}

// state interface
export interface ISearchState {
  packages: IPackage[];
  filter: ISearchFilter;
  error: Error | null ;
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

export type ISearchActionTypes = ISetPackagesAction | ISetFilterAction | ISetErrorAction;

// action creators
export const setPackages = (packages: IPackage[]): ISearchActionTypes => ({
  type: SET_PACKAGES,
  payload: packages,
  // meta: {
  //   throttle: 3000
  // }
});

export const setFilter = (filter: ISearchFilter): ISearchActionTypes => ({
  type: SET_FILTER,
  payload: filter
});

export const setError = (err: Error): ISearchActionTypes => ({
  type: SET_ERROR,
  payload: err
});

// TODO: sort packages + pagination
// TODO: FILTER ACTION ?
// TODO: fetchPackage again on
// export const sortPackages = () => {};

export const  fetchPackages = ({ query, limit = PACKAGES_PER_PAGE, offset }: ISearchFilter): any => async (dispatch: Dispatch<ISearchActionTypes>) => {
  const PAGE_NUMBER  = Math.floor(offset / limit);
  try {
    console.log(process.env);
    const res: AxiosResponse = await axios.get<IPackage>(`${process.env.REACT_APP_BASE_API_URI}/bower-search`, {
      params: {
        q: query,
        per_page: limit,
        page: PAGE_NUMBER,
        api_key: process.env.REACT_APP_API_KEY
      }
    });
    dispatch({
      type: SET_PACKAGES,
      payload: res.data
    });
  } catch(err) {
    console.error(err);
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  }
};

// export const fetchPackagesThrottled = (filter: ISearchFilter) => Util.throttle(fetchPackages, 3000, null);

const initialState: ISearchState = {
  packages: [],
  filter: {
    query: '',
    // sortField: '',
    // sortOrder: 'asc',
    offset: 0,
    limit: PACKAGES_PER_PAGE
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
