import type { FilterKeyString, Filters } from '../types';

export default <TFiltersDef>(
  key: FilterKeyString<TFiltersDef>,
): Partial<Filters<TFiltersDef>> => {
  return { [key]: '' } as Partial<Filters<TFiltersDef>>;
};
