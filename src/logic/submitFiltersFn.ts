import type { Filters } from '../types';

export default <TFiltersDef>(state: Filters<TFiltersDef>): URLSearchParams => {
  const queryParameters = new URLSearchParams();

  Object.keys(state).forEach((key) => {
    const filterKey = key as keyof TFiltersDef;
    const filter = state[filterKey];

    if (Array.isArray(filter)) {
      if (filter.length > 0) {
        filter.forEach((item) => {
          queryParameters.append(key, item);
        });
      }
    } else if (filter !== '') {
      queryParameters.append(key, filter);
    }
  });

  return queryParameters;
};
