type Filter = string | string[];

type FilterKey<TFiltersDef> = keyof TFiltersDef;

type FilterKeyString<TFiltersDef> = {
  [KFiltersDef in keyof TFiltersDef]: TFiltersDef[KFiltersDef] extends string
    ? KFiltersDef
    : never;
}[keyof TFiltersDef];

type FilterKeyArray<TFiltersDef> = {
  [KFiltersDef in keyof TFiltersDef]: TFiltersDef[KFiltersDef] extends string[]
    ? KFiltersDef
    : never;
}[keyof TFiltersDef];

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
    key: FilterKeyString<TFiltersDef>,
    options?: UseFiltersSettings,
  ) => void;
  removeFilters: (
    keys: FilterKeyArray<TFiltersDef>[],
    options?: UseFiltersSettings,
  ) => void;
  onSubmit: () => void;
  reset: () => void;
}

export type {
  Filter,
  FilterKey,
  FilterKeyArray,
  FilterKeyString,
  Filters,
  FiltersDef,
  UseFiltersOptions,
  UseFiltersReturn,
  UseFiltersSettings,
};
