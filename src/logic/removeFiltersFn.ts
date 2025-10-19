import type { FilterKeyArray, Filters } from '../types';

export default <TFiltersDef>(
  keys: FilterKeyArray<TFiltersDef>[],
): Partial<Filters<TFiltersDef>> => {
  return keys.reduce<Partial<Filters<TFiltersDef>>>((accumulator, key) => {
    accumulator[key] =
      [] as unknown as Filters<TFiltersDef>[FilterKeyArray<TFiltersDef>];
    return accumulator;
  }, {});
};
