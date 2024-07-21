import { vi, describe, it, expect, afterEach } from 'vitest';
import { cleanup, waitFor, fireEvent } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import { renderComponent } from '@/vitest/helper';
import CharacterListItem from '@/components/CharacterListItem.vue';
import { useCharacterStore } from '@/stores/character';
import { useClickCounterStore } from '@/stores/clickCounter';

describe('CharacterListItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders properly', () => {
    const { getByRole } = renderComponent(CharacterListItem, { name: 'kasumi' });

    const icon = getByRole('img');

    expect(icon).toHaveProperty('alt', 'icon-kasumi');
    expect(icon).toHaveProperty('src', 'http://localhost:3000/characters/face/kasumi.png');
  });

  it('changes its image path after deployed', () => {
    vi.stubGlobal('location', { ...location, pathname: '/nijigasaki-introduction' });

    const { getByRole } = renderComponent(CharacterListItem, { name: 'kasumi' });

    const icon = getByRole('img');

    expect(icon).toHaveProperty('src', 'http://localhost:3000/nijigasaki-introduction/characters/face/kasumi.png');

    vi.unstubAllGlobals();
  });

  it('does not dissappear until the popping animation is over', async () => {
    const {
      getByRole,
      store1: characterStore,
      store2: clickCounterStore,
    } = renderComponent<ReturnType<typeof useCharacterStore>, ReturnType<typeof useClickCounterStore>>(
      CharacterListItem,
      { name: 'kasumi' },
      undefined,
      undefined,
      [useCharacterStore, useClickCounterStore]
    );

    const icon = getByRole('img');

    await userEvent.click(icon);

    await waitFor(() => expect(icon.parentElement?.parentElement?.classList).toContain('pop-up'));
    await waitFor(() => expect(characterStore?.character).toBeUndefined());
    await waitFor(() => expect(clickCounterStore?.clickCount).toBe(0));
  });

  it('gets invisible and stores the name when clicked', async () => {
    const {
      getByRole,
      store1: characterStore,
      store2: clickCounterStore,
    } = renderComponent<ReturnType<typeof useCharacterStore>, ReturnType<typeof useClickCounterStore>>(
      CharacterListItem,
      { name: 'kasumi' },
      undefined,
      undefined,
      [useCharacterStore, useClickCounterStore]
    );

    const icon = getByRole('img');

    await fireEvent.animationEnd(icon.parentElement?.parentElement as HTMLDivElement);
    await waitFor(() => userEvent.click(icon));

    await waitFor(() => expect(icon.parentElement?.parentElement?.classList).toContain('roll-out'));
    await waitFor(() => expect(characterStore?.character).toBe('kasumi'));
    await waitFor(() => expect(clickCounterStore?.clickCount).toBe(1));
  });

  it('gets invisible but does not roll out if the name differs from one in the store', async () => {
    const { getByRole, store1: characterStore } = renderComponent<ReturnType<typeof useCharacterStore>>(
      CharacterListItem,
      { name: 'kasumi' },
      undefined,
      undefined,
      [useCharacterStore]
    );

    const icon = getByRole('img');

    await fireEvent.animationEnd(icon.parentElement?.parentElement as HTMLDivElement);
    await waitFor(() => userEvent.click(icon));
    characterStore?.setCharacter('ayumu');

    await waitFor(() => expect(icon.parentElement?.parentElement?.classList).toContain('fade-out'));
  });
});
