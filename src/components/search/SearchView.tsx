import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import SearchItem from './SearchItem/SearchItem';
import InputField from '../common/InputField/InputField';
import Pagination from '../common/Pagination/Pagination';
import Dropdown, { IDropdownItem } from '../common/Dropdown/Dropdown';
import { IPackage } from '../../shared/interfaces/IPackage';
import { TRootState } from '../../store/modules';
import { fetchPackages, ISearchActionTypes, ISearchFilter, setFilter } from '../../store/modules/search';
import Util from '../../shared/utils/Util';
import getFilteredPackages, { getFilter, getIsLoading } from '../../store/modules/search/selectors';
import { SORT_ITEMS } from '../../shared/interfaces/ISort';
import styles from './search-view.module.scss';

const mapStateToProps = (state: TRootState) => ({
  isLoading: getIsLoading(state),
  filter: getFilter(state),
  filteredPackages: getFilteredPackages(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ISearchActionTypes>) => ({
  fetchPackages: (filter: ISearchFilter) => dispatch(fetchPackages(filter)),
  setFilter: (filter: ISearchFilter) => dispatch(setFilter(filter))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TSearchViewProps = PropsFromRedux & {
  children?: React.ReactNode;
}

type TSearchViewState = {
  searchValue: string;
  filter?: ISearchFilter;
  selectedSortItem: IDropdownItem;
  currentPaginationPage: number;
}

export class SearchView extends React.Component<TSearchViewProps, TSearchViewState> {
  private onSearchQueryChangeThrottled: (context: any, ...args: any[]) => void;
  constructor(props: TSearchViewProps) {
    super(props);
    this.onSearchQueryChangeThrottled = Util.throttle(this.onSearchQueryChange.bind(this), 100, this);
  }
  state = {
    searchValue: '',
    selectedSortItem: SORT_ITEMS.name,
    currentPaginationPage: 1
  };

  componentDidMount(): void {
    const { fetchPackages } = this.props;
    const { currentPaginationPage, selectedSortItem } = this.state;
    fetchPackages({
      query: '',
      page: currentPaginationPage,
      sortField: selectedSortItem.value
    });
  }

  onSearchQueryChange(query: string): void {
    this.setState({
      searchValue: query,
      currentPaginationPage: 1
    });
    this.props.fetchPackages({
      query,
      page: 1
    });
  };

  onSelectSortItem = (item: IDropdownItem): void => {
    const { setFilter, filter, fetchPackages } = this.props;
    const { searchValue } = this.state;
    this.setState({ selectedSortItem: item });
    setFilter({
      ...filter,
      sortField: item.value
    });
    if (item === SORT_ITEMS.stars) {
      fetchPackages({
        query: searchValue,
        sortField: item.value
      });
    }
  };

  onChangePaginationPage = (page: number): void => {
    const { fetchPackages } = this.props;
    const { searchValue } = this.state;
    this.setState({ currentPaginationPage: page });
    fetchPackages({
      query: searchValue,
      page
    });
  };

  renderList = (): React.ReactNode => {
    const { filteredPackages, isLoading } = this.props;
    if (isLoading) {
      return <div className={styles.loadingLabel}>Loading...</div>;
    } else if (!filteredPackages.length) {
      return <div className={styles.noPackagesLabel}>No packages found</div>
    } else {
      return (
        <div className={styles.resultsWrapper}>
          <div className={styles.resultsHeader}>
            <div className={styles.packageName}>Name</div>
            <div className={styles.packageOwner}>Owner</div>
            <div className={styles.packageStars}>Stars</div>
          </div>
          {filteredPackages.map((pkg: IPackage, idx: number) =>
            <SearchItem
              key={idx}
              className={styles.searchItemWrapper}
              pkg={pkg} />)
          }
        </div>
      );
    }
  };

  renderPagination = () => {
    const { filteredPackages, isLoading, filter } = this.props;
    const { currentPaginationPage } = this.state;
    const MAX_PAGES_IN_ROW = 8;

    if (!isLoading && filteredPackages.length) {
      return (
        <Pagination
          className={styles.paginationWrapper}
          totalPages={Number(filter.total)}
          maxPagesInRow={MAX_PAGES_IN_ROW}
          currentPage={currentPaginationPage}
          onChangePage={this.onChangePaginationPage} />
      );
    }

    return null;
  };


  render() {
    const { searchValue, selectedSortItem } = this.state;
    return (
      <div className={styles.searchView}>
        <div className={styles.searchControls}>
          <InputField
            className={styles.inputField}
            value={searchValue}
            placeholder={'Search package'}
            onChange={this.onSearchQueryChange.bind(this)}
          />
          <Dropdown
            className={styles.searchFilterWrapper}
            items={Object.values(SORT_ITEMS)}
            selected={selectedSortItem}
            defaultPlaceholder={'Select sort option'}
            onSelect={this.onSelectSortItem} />
        </div>
        {this.renderList()}
        {this.renderPagination()}
      </div>
    );
  }
}

export default connector(SearchView);
