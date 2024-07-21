import { vi, describe, it, expect, afterEach } from 'vitest';
import { h } from 'vue';
import { cleanup } from '@testing-library/vue';
import { renderComponent } from '@/vitest/helper';
import CharacterList from '@/components/CharacterList.vue';
import type { Character } from '@/constants/characters';

vi.mock('@/constants/characters', () => {
  return {
    CHARACTERS: [
      {
        id: 0,
        name: 'character1',
        color: '#ffffff',
      },
      {
        id: 1,
        name: 'character2',
        color: '#000000',
      },
      {
        id: 2,
        name: 'character3',
        color: '#00ff00',
      },
    ] as const satisfies Character[],
  };
});

describe('CharacterList', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders properly', () => {
    const { getAllByRole } = renderComponent(CharacterList, undefined, undefined, {
      CharacterListItem: {
        props: {
          name: String,
        },
        setup: (props) => {
          return () => h('div', { role: 'item', id: props.name });
        },
      },
    });

    const characterList = getAllByRole('item');

    expect(characterList).toHaveLength(3);
    expect(characterList[0]).toHaveProperty('id', 'character1');
    expect(characterList[1]).toHaveProperty('id', 'character2');
    expect(characterList[2]).toHaveProperty('id', 'character3');
  });
});
