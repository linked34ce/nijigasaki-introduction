import { vi } from 'vitest';
import { render, type RenderOptions } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

export const renderComponent = (component: any, options?: RenderOptions) =>
  render(component, {
    ...options,
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  });
