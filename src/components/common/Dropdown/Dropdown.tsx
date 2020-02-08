import React from 'react';
import cn from 'classnames';
import { ReactComponent as SvgArrowDown } from '../../../assets/icons/arrow_down.svg';
import styles from './dropdown.module.scss';

export interface IDropdownItem {
  value: string;
  label: string;
}

type TDropdownProps = {
  items: IDropdownItem[];
  selected: IDropdownItem | null;
  defaultPlaceholder: string;
  hasReset?: boolean;
  className?: string;
  onSelect: (item: IDropdownItem) => void;
}

type TDropdownState = {
  isActive: boolean;
}

export default class Dropdown extends React.Component<TDropdownProps, TDropdownState> {
  private dropdownRef: React.RefObject<HTMLElement>;
  constructor(props: TDropdownProps) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  state = {
    isActive: false
  };

  closeDropdown = () => {
    console.log('close');
    this.setState({ isActive: false });
  };

  toggleDropdown = () => {
    console.log('toggle');
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };

  getPlaceholderValue = (): string => {
    const { selected, defaultPlaceholder, items } = this.props;
    if (defaultPlaceholder && !selected) {
      return defaultPlaceholder;
    }
    if (!selected) {
      return items[0].label;
    }

    return selected.label;
  };

  handleItemClick = (item: IDropdownItem) => {
    console.log('itemClick');
    const { onSelect } = this.props;
    onSelect(item);
    this.closeDropdown();

  };

  isActiveItem = (item: IDropdownItem): boolean => {
    const { selected } = this.props;
    if (!selected) {
      return false;
    }
    return item.value === selected.value;
  };

  render() {
    const { isActive } = this.state;
    const { items, className } = this.props;
    return (
      <div
        className={cn(styles.dropdown, className, { [styles.isActive]: isActive })}
        onBlur={this.closeDropdown}>
        <div
          className={styles.dropdownTrigger}
          onClick={this.toggleDropdown}
          onBlur={this.closeDropdown}>
            <div className={styles.placeholder}>
              { this.getPlaceholderValue() }
            </div>
          <div className={cn(styles.arrowIcon, { [styles.iconRotated]: isActive })}>
            <SvgArrowDown />
          </div>
        </div>
        <div className={styles.dropdownContent}>
          {items.map((item: IDropdownItem) => (
            <div
              key={item.value}
              className={cn(styles.menuItem, { [styles.isActiveItem]: this.isActiveItem(item) })}
              onClick={() => this.handleItemClick(item)}>
              { item.label }
            </div>
          ))}
        </div>
      </div>
    )
  }
}
