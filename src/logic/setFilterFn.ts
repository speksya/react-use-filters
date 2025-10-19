import type { Filter, FilterKey, Filters } from '../types';

export default <TFiltersDef>(
  key: FilterKey<TFiltersDef>,
  item: Filter,
  value: string,
): Partial<Filters<TFiltersDef>> => {
  if (Array.isArray(item)) {
    const exists = item.includes(value);
    return {
      [key]: exists ? item.filter((v) => v !== value) : [...item, value],
    } as Partial<Filters<TFiltersDef>>;
  }
  return { [key]: value } as Partial<Filters<TFiltersDef>>;
};
