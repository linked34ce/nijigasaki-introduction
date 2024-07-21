import { describe, it, expect, afterEach } from 'vitest';
import { h } from 'vue';
import { cleanup } from '@testing-library/vue';
import { renderComponent } from '@/vitest/helper';
import CharacterList from '@/components/CharacterList.vue';

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
    expect(characterList[0]).toHaveProperty('id', 'yu');
    expect(characterList[1]).toHaveProperty('id', 'ayumu');
    expect(characterList[2]).toHaveProperty('id', 'kasumi');
  });
});
