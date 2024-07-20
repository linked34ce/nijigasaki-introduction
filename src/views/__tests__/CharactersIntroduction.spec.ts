import { describe, it, expect, afterEach } from 'vitest';
import { h } from 'vue';
import { cleanup } from '@testing-library/vue';
import { renderComponent } from '@/vitest/helper';
import CharactersIntroduction from '@/views/CharactersIntroduction.vue';

describe('CharactersIntroduction', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders properly', async () => {
    const { getByRole } = renderComponent(CharactersIntroduction, undefined, undefined, {
      GradientBackground: {
        render: () => h('div', { role: 'background', id: 'gradient-background' }),
      },
      CharacterList: {
        render: () => h('div', { role: 'list', id: 'character-list' }),
      },
    });

    const background = getByRole('background');
    const characterList = getByRole('list');

    expect(background).toHaveProperty('id', 'gradient-background');
    expect(characterList).toHaveProperty('id', 'character-list');
  });
});
