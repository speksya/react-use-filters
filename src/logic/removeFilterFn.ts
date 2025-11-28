import type { FilterKey, Filters } from '../types';

export default <TFiltersDef>(
  key: FilterKey<TFiltersDef> | FilterKey<TFiltersDef>[],
  state: Filters<TFiltersDef>,
): Filters<TFiltersDef> => {
  if (Array.isArray(key)) {
    return key.reduce<Filters<TFiltersDef>>((accumulator, itemKey) => {
      const item = state[itemKey];
      accumulator[itemKey] = (
        Array.isArray(item) ? [] : ''
      ) as Filters<TFiltersDef>[FilterKey<TFiltersDef>];

      return accumulator;
    }, {} as Filters<TFiltersDef>);
  } else {
    const item = state[key];

    return { [key]: Array.isArray(item) ? [] : '' } as Filters<TFiltersDef>;
  }
};
