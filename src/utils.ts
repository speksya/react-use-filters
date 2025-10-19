import { useEffect, useLayoutEffect } from 'react';

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value == null;

const isPrimitive = (value: unknown): value is Primitive =>
  isNullOrUndefined(value) || !isObjectType(value);

const isObjectType = (value: unknown): value is object =>
  typeof value === 'object';

const isObject = <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value);

const deepEqual = (
  object1: any,
  object2: any,
  _internal_visited = new WeakSet(),
) => {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return object1 === object2;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  if (_internal_visited.has(object1) || _internal_visited.has(object2)) {
    return true;
  }
  _internal_visited.add(object1);
  _internal_visited.add(object2);

  for (const key of keys1) {
    const value1 = object1[key];

    if (!keys2.includes(key)) {
      return false;
    }

    if (key !== 'ref') {
      const value2 = object2[key];

      if (
        (isObject(value1) && isObject(value2)) ||
        (Array.isArray(value1) && Array.isArray(value2))
          ? !deepEqual(value1, value2, _internal_visited)
          : value1 !== value2
      ) {
        return false;
      }
    }
  }

  return true;
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export { deepEqual, useIsomorphicLayoutEffect };
