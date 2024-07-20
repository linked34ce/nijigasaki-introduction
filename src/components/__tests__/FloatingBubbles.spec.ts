import { vi, describe, it, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import { renderComponent } from '@/vitest/helper';
import FloatingBubbles from '@/components/FloatingBubbles.vue';

vi.mock('lodash', () => {
  return {
    shuffle: vi.fn().mockReturnValue([5, 20, 40, 65, 90]),
  };
});

describe('FloatingBubbles', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders properly', async () => {
    const { getAllByTitle } = renderComponent(FloatingBubbles);

    const bubbles = getAllByTitle('bubble');

    expect(bubbles).toHaveLength(5);
    expect(bubbles[0].classList).toContain('x-coord-5');
    expect(bubbles[1].classList).toContain('x-coord-20');
    expect(bubbles[2].classList).toContain('x-coord-40');
    expect(bubbles[3].classList).toContain('x-coord-65');
    expect(bubbles[4].classList).toContain('x-coord-90');
  });
});
