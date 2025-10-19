import React from 'react';

import type { FiltersDef, UseFiltersReturn } from './types';

type FilterProviderProperties<TFiltersDef extends FiltersDef<TFiltersDef>> =
  UseFiltersReturn<TFiltersDef> & {
    children: React.ReactNode | React.ReactNode[];
  };

const FiltersContext = React.createContext<UseFiltersReturn<any> | null>(null);
FiltersContext.displayName = 'FiltersContext';

const useFiltersContext = <
  TFiltersDef extends FiltersDef<TFiltersDef>,
>(): UseFiltersReturn<TFiltersDef> => {
  return React.useContext(FiltersContext) as UseFiltersReturn<TFiltersDef>;
};

const FiltersProvider = <TFiltersDef extends FiltersDef<TFiltersDef>>(
  props: FilterProviderProperties<TFiltersDef>,
) => {
  const { children, ...data } = props;

  return (
    <FiltersContext.Provider
      value={data as unknown as UseFiltersReturn<TFiltersDef>}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersProvider, useFiltersContext };
