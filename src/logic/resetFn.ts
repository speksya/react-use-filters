import type { FilterKey, Filters } from '../types';

export default <TFiltersDef>(
  state: Filters<TFiltersDef>,
): Filters<TFiltersDef> => {
  return Object.keys(state).reduce<Filters<TFiltersDef>>((accumulator, key) => {
    const filterKey = key as FilterKey<TFiltersDef>;
    const filter = state[filterKey];

    accumulator[filterKey] = (
      Array.isArray(filter) ? [] : ''
    ) as Filters<TFiltersDef>[FilterKey<TFiltersDef>];

    return accumulator;
  }, {} as Filters<TFiltersDef>);
};
