import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { cleanup, waitFor, fireEvent, render } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import { useCharacterStore } from '@/stores/character';
import CharacterListItem from '@/components/CharacterListItem.vue';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';

describe('CharacterListItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('renders properly', () => {
    const { getByRole } = render(CharacterListItem, { props: { name: 'kasumi' } });

    const icon = getByRole('img');

    expect(icon).toHaveProperty('alt', 'icon-kasumi');
  });

  it('gets invisible and stores the name when clicked', async () => {
    const { getByRole, getByTestId } = render(CharacterListItem, { props: { name: 'kasumi' } });
    const { character } = storeToRefs(useCharacterStore());

    const icon = getByRole('img');
    const iconWrapper = getByTestId('icon-wrapper');

    await fireEvent.animationEnd(icon);

    expect(iconWrapper.className).toBe('');
    expect(character.value).toBeUndefined();

    await userEvent.click(icon);

    await waitFor(() => expect(iconWrapper.className).toBe('dissappear'));
    await waitFor(() => expect(character.value).toBe('kasumi'));
  });

  it('does not dissappear until the popping animation is over', async () => {
    const { getByRole, getByTestId } = render(CharacterListItem, { props: { name: 'kasumi' } });

    const icon = getByRole('img');
    const iconWrapper = getByTestId('icon-wrapper');

    await userEvent.click(icon);

    await waitFor(() => expect(iconWrapper.className).toBe(''));
  });
});
