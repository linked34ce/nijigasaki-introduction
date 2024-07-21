import { describe, it, expect, afterEach } from 'vitest';
import { h } from 'vue';
import { cleanup, waitFor } from '@testing-library/vue';
import { renderComponent } from '@/vitest/helper';
import GradientBackground from '@/components/GradientBackground.vue';
import { useCharacterStore } from '@/stores/character';

describe('GradientBackground', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders properly', async () => {
    const { getByTitle } = renderComponent(GradientBackground, undefined, undefined, {
      FloatingBubbles: {
        render: () => '<div></div>',
      },
    });

    const deepBackground = getByTitle('deep');
    const shallowBackground = getByTitle('shallow');

    expect(deepBackground.classList).toContain('from-sky-500');
    expect(deepBackground.classList).toContain('to-indigo-500');
    expect(shallowBackground.classList).toContain('from-sky-500');
    expect(shallowBackground.classList).toContain('to-indigo-500');
  });

  it('changes its color when a character name is given', async () => {
    const { getByTitle, store1: characterStore } = renderComponent<
      ReturnType<typeof useCharacterStore>
    >(
      GradientBackground,
      undefined,
      undefined,
      {
        FloatingBubbles: {
          render: () => h('div'),
        },
      },
      [useCharacterStore]
    );

    characterStore?.setCharacter('kasumi');

    const deepBackground = getByTitle('deep');
    const shallowBackground = getByTitle('shallow');

    expect(deepBackground.classList).toContain('from-sky-500');
    expect(deepBackground.classList).toContain('to-indigo-500');
    await waitFor(() => expect(shallowBackground.classList).toContain('bg-kasumi'));
    await waitFor(() => expect(shallowBackground.classList).toContain('from-deep-to-shallow'));
  });
});
