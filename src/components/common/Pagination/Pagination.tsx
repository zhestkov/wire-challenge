import React from 'react';
import cn from 'classnames';
import { ReactComponent as SvgArrowDown } from '../../../assets/icons/arrow_down.svg';
import styles from './pagination.module.scss';


type TPaginationProps = {
  className?: string;
  maxPagesInRow?: number;
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

type TPaginationState = {
  maxPagesInRow: number;
  startPage: number;
}

const START_PAGE_NUMBER = 1;
const MAX_PAGES_IN_ROW_DEFAULT = 10;

export default class Pagination extends React.Component<TPaginationProps, TPaginationState> {
  state = {
    maxPagesInRow: 6,
    startPage: 1
  };

  componentDidMount(): void {
    const { maxPagesInRow } = this.props;
    this.setState({
      maxPagesInRow: maxPagesInRow || MAX_PAGES_IN_ROW_DEFAULT
    });
  }

  isEvenMaxPagesInRow = () => {
    const { maxPagesInRow } = this.state;
    return maxPagesInRow % 2 === 0;
  };
  isFirstPage = (): boolean => this.props.currentPage === this.state.startPage;
  isSelected = (page: number): boolean => this.props.currentPage === page;
  isFirstPart = (): boolean => {
    const { currentPage } = this.props;
    const { startPage } = this.state;
    return currentPage <= startPage + this.getStep();
  };
  isLastPart(): boolean {
    const { currentPage, totalPages } = this.props;
    return this.isEvenMaxPagesInRow()
      ? currentPage > totalPages - this.getStep()
      : currentPage >= totalPages - this.getStep();
  };

  setPage = (page: number) => {
    console.log(page);
    const { currentPage, totalPages, onChangePage } = this.props;
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onChangePage(page);
    }
  };

  getStep = (): number => Math.floor(this.state.maxPagesInRow / 2);

  hasManyPages = (): boolean => {
    const { maxPagesInRow } = this.state;
    const { totalPages } = this.props;
    return totalPages > maxPagesInRow;
  };

  PagesArray = () => {
    return this.hasManyPages()
      ? this.getPagesArray()
      : this.getPageRange(START_PAGE_NUMBER, this.props.totalPages);
  };

  getPagesArray = (): number[] => {
    const { currentPage, totalPages } = this.props;
    const { maxPagesInRow, startPage } = this.state;
    let startRange: number;
    let endRange: number;

    if (this.isFirstPart()) {
      startRange = startPage;
      endRange = maxPagesInRow;
    } else if (this.isLastPart()) {
      startRange = totalPages - (maxPagesInRow - 1);
      endRange = totalPages;
    } else {
      startRange = currentPage - this.getStep();
      endRange = this.isEvenMaxPagesInRow() ?
        currentPage + this.getStep() - 1 :
        currentPage + this.getStep();
    }

    return this.getPageRange(startRange, endRange);
  };

  getPageRange = (low: number, high: number): number[] => {
    const pageRange: number[] = [];
    for (let i = low; i <= high; i += 1) {
      pageRange.push(i);
    }
    return pageRange;
  };

  render() {
    const { className, currentPage, totalPages } = this.props;
    return (
      <div className={cn(styles.pagination, className)}>
        <div
          className={cn(styles.paginationItem, styles.arrowLeftIcon, { [styles.isDisabled]: this.isFirstPage() })}
          onClick={() => this.setPage(currentPage - 1)}>
          <SvgArrowDown />
        </div>
        {this.PagesArray().map((page: number) => (
          <div
            key={page}
            className={cn(styles.paginationItem, styles.paginationNumber, { [styles.isSelected]: this.isSelected(page) })}
            onClick={() => this.setPage(page)}>
            { page }
          </div>
        ))}
        <div
          className={cn(styles.paginationItem, styles.arrowRightIcon, { [styles.isDisabled]: currentPage === totalPages })}
          onClick={() => this.setPage(currentPage + 1)}>
          <SvgArrowDown />
        </div>
      </div>
    )
  }
}
