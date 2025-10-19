import type { Filter } from '../types';

export default (item: Filter, amount: number): number => {
  if (Array.isArray(item)) {
    return amount + item.length;
  }
  return item === '' ? amount : amount + 1;
};
