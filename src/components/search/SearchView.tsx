import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import SearchItem from './SearchItem/SearchItem';
import InputField from '../common/InputField/InputField';
import Pagination from '../common/Pagination/Pagination';
import Dropdown, { IDropdownItem } from '../common/Dropdown/Dropdown';
import { IPackage } from '../../shared/interfaces/IPackage';
import { TRootState } from '../../store/modules';
import { fetchPackages, ISearchActionTypes, ISearchFilter } from '../../store/modules/search';
import Util from '../../shared/utils/Util';
import styles from './search-view.module.scss';

const mapStateToProps = (state: TRootState) => ({
  packages: state.search.packages
});

const mapDispatchToProps = (dispatch: Dispatch<ISearchActionTypes>) => ({
  fetchPackages: (filter: ISearchFilter) => dispatch(fetchPackages(filter))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TSearchViewProps = PropsFromRedux & {
  children: React.ReactNode;
}

type TSearchViewState = {
  searchValue: string;
  filter?: ISearchFilter;
  selectedSortItem: IDropdownItem | null;
}

const SORT_ITEMS = [
  {
    value: 'owner',
    label: 'Owner'
  },
  {
    value: 'stars',
    label: 'Stars'
  },
  {
    value: 'name',
    label: 'Package name'
  }
  ] as IDropdownItem[];

export class SearchView extends React.Component<TSearchViewProps, TSearchViewState> {
  private onSearchQueryChangeThrottled: (context: any, ...args: any[]) => void;
  constructor(props: TSearchViewProps) {
    super(props);
    // this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSearchQueryChangeThrottled = Util.throttle(this.onSearchQueryChange.bind(this), 100, this);
  }
  state = {
    searchValue: '',
    selectedSortItem: null
  };

  componentDidMount(): void {
    const { fetchPackages } = this.props;
    fetchPackages({ query: 'react', limit: 5, offset: 0 });
  }

  onSearchQueryChange = (query: string) => {
    this.setState({
      searchValue: query
    });
    this.props.fetchPackages({
      query,
      limit: 5,
      offset: 0
    });
  };

  onSelectSortItem = (item: IDropdownItem) => this.setState({ selectedSortItem: item });


  render() {
    const { searchValue, selectedSortItem } = this.state;
    const { packages } = this.props;
    return (
      <div className={styles.searchView}>
        <div className={styles.searchControls}>
          <InputField
            className={styles.inputField}
            value={searchValue}
            placeholder={'Search package'}
            onChange={this.onSearchQueryChange}
          />
          <Dropdown
            className={styles.dropdownWrapper}
            items={SORT_ITEMS}
            selected={selectedSortItem}
            defaultPlaceholder={'Select sort option'}
            onSelect={this.onSelectSortItem} />
        </div>
        <div className={styles.resultsHeader}>
          <div className={styles.packageName}>Name</div>
          <div className={styles.packageOwner}>Owner</div>
          <div className={styles.packageStars}>Stars</div>
        </div>
        {packages.map((pkg: IPackage, idx: number) =>
            <SearchItem key={idx} pkg={pkg} />)
        }
        <Pagination className={styles.paginationWrapper} />
      </div>
    );
  }
}

export default connector(SearchView);
