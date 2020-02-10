import { createSelector } from 'reselect';
import {SORT_ITEM_OWNER, SORT_ITEM_PACKAGE_NAME, SORT_ITEM_STARS} from '../../../shared/interfaces/ISort';
import {IPackage} from '../../../shared/interfaces/IPackage';
import {TRootState} from '../index';

export const getPackages = (state: TRootState) => state.search.packages;
export const getFilter = (state: TRootState) => state.search.filter;
export const getIsLoading = (state: TRootState) => state.loading.isLoading;


export const getFilteredPackages = createSelector(
  [getPackages, getFilter],
  (packages, filter) => {
    switch(filter.sortField) {
      case SORT_ITEM_STARS:
        return packages;
      case SORT_ITEM_OWNER:
        return packages.sort((a: IPackage, b: IPackage) => {
          return ('' + a.repository_url).localeCompare(b.repository_url)
        });
      case SORT_ITEM_PACKAGE_NAME:
        return packages.sort((a: IPackage, b: IPackage) => {
          return ('' + a.name).localeCompare(b.name);
        });
      default:
        return [];
    }
  }
);

export default getFilteredPackages;
