import { IDropdownItem } from '../../components/common/Dropdown/Dropdown';

export const SORT_ITEM_PACKAGE_NAME = 'name';
export const SORT_ITEM_OWNER = 'owner';
export const SORT_ITEM_STARS = 'stars';

export const SORT_ITEMS = {
  name: {
    value: SORT_ITEM_PACKAGE_NAME,
    label: 'Package name'
  },
  owner: {
    value: SORT_ITEM_OWNER,
    label: 'Owner'
  },
  stars: {
    value: SORT_ITEM_STARS,
    label: 'Stars'
  }
} as {[key: string]: IDropdownItem};
