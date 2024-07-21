import { vi } from 'vitest';
import { type Component } from 'vue';
import { type StoreDefinition } from 'pinia';
import { render, type RenderResult } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

type Stores<T, U, V> = {
  store1: T;
  store2: U;
  store3: V;
};

type RenderComponentRetrunType<T, U, V> = RenderResult & Partial<Stores<T, U, V>>;

export const renderComponent = <T = never, U = never, V = never>(
  component: any,
  props?: object,
  initialState?: object,
  stubs?: Record<string, Component>,
  storeFunctions?: StoreDefinition[]
): RenderComponentRetrunType<T, U, V> => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
    stubActions: false,
    initialState,
  });

  const store1 =
    storeFunctions && storeFunctions.length > 0
      ? ((storeFunctions as StoreDefinition[])[0](pinia) as T)
      : undefined;
  const store2 =
    storeFunctions && storeFunctions.length > 1
      ? ((storeFunctions as StoreDefinition[])[1](pinia) as U)
      : undefined;
  const store3 =
    storeFunctions && storeFunctions.length > 2
      ? ((storeFunctions as StoreDefinition[])[2](pinia) as V)
      : undefined;

  return {
    ...render(component, {
      props,
      global: {
        plugins: [pinia],
        stubs: stubs,
      },
    }),
    store1,
    store2,
    store3,
  };
};
