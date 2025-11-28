type Filter = string | string[];

type FilterKey<TFiltersDef> = keyof TFiltersDef;

type Filters<TFiltersDef> = {
  [KFiltersDef in keyof TFiltersDef]: TFiltersDef[KFiltersDef] extends Filter
    ? TFiltersDef[KFiltersDef]
    : never;
};

type FiltersDef<TFiltersDef> = {
  [KFiltersDef in keyof TFiltersDef]: Filter;
};

interface UseFiltersSettings {
  force: boolean;
}

interface UseFiltersOptions<TFiltersDef> {
  defaultValues: Filters<TFiltersDef>;
  submitFn: ({
    query,
    state,
  }: {
    query: URLSearchParams;
    state: Filters<TFiltersDef>;
  }) => void;
}

interface UseFiltersReturn<TFiltersDef> {
  state: {
    count: number;
    defaultValues: Filters<TFiltersDef>;
    isReady: boolean;
    values: Filters<TFiltersDef>;
  };
  setFilter: (
    key: FilterKey<TFiltersDef>,
    value: string,
    options?: UseFiltersSettings,
  ) => void;
  removeFilter: (
    key: FilterKey<TFiltersDef> | FilterKey<TFiltersDef>[],
    options?: UseFiltersSettings,
  ) => void;
  handleSubmit: () => void;
  reset: () => void;
}

export type {
  Filter,
  FilterKey,
  Filters,
  FiltersDef,
  UseFiltersOptions,
  UseFiltersReturn,
  UseFiltersSettings,
};
