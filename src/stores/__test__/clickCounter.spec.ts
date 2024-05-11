import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useClickCounterStore } from '@/stores/clickCounter';

describe('useClickCounterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can count up by 1', () => {
    const clickCounterStore = useClickCounterStore();
    clickCounterStore.increment();
    expect(clickCounterStore.clickCount).toBe(1);
  });

  it('sets zero when reset', () => {
    const clickCounterStore = useClickCounterStore();
    clickCounterStore.increment();
    clickCounterStore.reset();
    expect(clickCounterStore.clickCount).toBe(0);
  });
});
