import React from 'react';

import {
  countFn,
  isReadyFn,
  removeFilterFn,
  resetFn,
  setFilterFn,
  submitFiltersFn,
} from './logic';
import type {
  FilterKey,
  Filters,
  FiltersDef,
  UseFiltersOptions,
  UseFiltersReturn,
  UseFiltersSettings,
} from './types';
import { deepEqual, useIsomorphicLayoutEffect } from './utils';

const useFilters = <TFiltersDef extends FiltersDef<TFiltersDef>>(
  settings: UseFiltersOptions<TFiltersDef>,
): UseFiltersReturn<TFiltersDef> => {
  const { defaultValues, submitFn } = settings;

  const previousDefaultValuesReference =
    React.useRef<Filters<TFiltersDef>>(defaultValues);
  const initialStateReference =
    React.useRef<Filters<TFiltersDef>>(defaultValues);

  const [state, setState] = React.useReducer(
    (
      oldState: Filters<TFiltersDef>,
      newState: Partial<Filters<TFiltersDef>>,
    ) => ({
      ...oldState,
      ...newState,
    }),
    defaultValues,
  );

  const checkOptions = React.useCallback(
    (context: Filters<TFiltersDef>, options?: UseFiltersSettings) => {
      const { force } = options ?? {};
      if (force === true) {
        submitFn({
          query: submitFiltersFn(context),
          state: context,
        });
        initialStateReference.current = context;
      }
    },
    [submitFn],
  );

  const count = React.useMemo<number>(() => {
    return Object.keys(state).reduce((acc, key) => {
      const filterKey = key as FilterKey<TFiltersDef>;
      const filter = state[filterKey];

      return countFn(filter, acc);
    }, 0);
  }, [state]);

  const isReady = React.useMemo<boolean>(() => {
    return Object.keys(state).some((key) => {
      const filterKey = key as FilterKey<TFiltersDef>;
      const filter = state[filterKey];
      const initialFilter = initialStateReference.current[filterKey];

      return isReadyFn(filter, initialFilter);
    });
  }, [state]);

  const setFilter = React.useCallback(
    (
      key: FilterKey<TFiltersDef>,
      value: string,
      options?: UseFiltersSettings,
    ) => {
      const filter = state[key];
      const updatedFilter = setFilterFn(key, filter, value);
      const updatedState = { ...state, ...updatedFilter };

      setState(updatedFilter);
      checkOptions(updatedState, options);
    },
    [state, checkOptions],
  );

  const removeFilter = React.useCallback(
    (
      key: FilterKey<TFiltersDef> | FilterKey<TFiltersDef>[],
      options?: UseFiltersSettings,
    ): void => {
      const updatedFilter = removeFilterFn(key, state);
      const updatedState = { ...state, ...updatedFilter };

      setState(updatedFilter);
      checkOptions(updatedState, options);
    },
    [state, checkOptions],
  );

  const reset = React.useCallback(() => {
    const resetState = resetFn(state);

    setState(resetState);
  }, [state]);

  const handleSubmit = React.useCallback(() => {
    submitFn({ query: submitFiltersFn(state), state });
    initialStateReference.current = state;
  }, [submitFn, state]);

  useIsomorphicLayoutEffect(() => {
    if (!deepEqual(previousDefaultValuesReference.current, defaultValues)) {
      previousDefaultValuesReference.current = defaultValues;
      initialStateReference.current = defaultValues;

      setState(defaultValues);
    }
  }, [defaultValues]);

  return {
    state: {
      defaultValues,
      values: state,
      count,
      isReady,
    },
    setFilter,
    removeFilter,
    reset,
    handleSubmit,
  };
};

export { useFilters };
