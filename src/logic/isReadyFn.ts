import type { Filter } from '../types';

export default (item: Filter, initialItem: Filter): boolean => {
  if (Array.isArray(item) && Array.isArray(initialItem)) {
    if (item.length !== initialItem.length) {
      return true;
    }

    const hasNewItems = item.some((v) => !initialItem.includes(v));
    const hasRemovedItems = initialItem.some((v) => !item.includes(v));

    return hasNewItems || hasRemovedItems;
  }
  return item !== initialItem;
};
