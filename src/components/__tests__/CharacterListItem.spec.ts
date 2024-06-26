import { vi, describe, it, expect, afterEach } from 'vitest';
import { cleanup, waitFor, fireEvent } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import { renderComponent } from '@/vitest/helper';
import CharacterListItem from '@/components/CharacterListItem.vue';

const { setCharacterMock, incrementMock } = vi.hoisted(() => {
  return {
    setCharacterMock: vi.fn(),
    incrementMock: vi.fn()
  };
});

vi.mock('@/stores/character', () => {
  const originalModule = vi.importActual<typeof import('@/stores/character')>('@/stores/character');
  return {
    ...originalModule,
    useCharacterStore: () => {
      return {
        setCharacter: setCharacterMock
      };
    }
  };
});

vi.mock('@/stores/clickCounter', () => {
  const originalModule =
    vi.importActual<typeof import('@/stores/clickCounter')>('@/stores/clickCounter');
  return {
    ...originalModule,
    useClickCounterStore: () => {
      return {
        increment: incrementMock
      };
    }
  };
});

describe('CharacterListItem', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders properly', () => {
    const { getByRole } = renderComponent(CharacterListItem, { props: { name: 'kasumi' } });

    const icon = getByRole('img');

    expect(icon).toHaveProperty('alt', 'icon-kasumi');
  });

  it('gets invisible and stores the name when clicked', async () => {
    const { getByRole, getByTestId } = renderComponent(CharacterListItem, {
      props: { name: 'kasumi' }
    });

    const icon = getByRole('img');
    const iconWrapper = getByTestId('icon-wrapper');

    await fireEvent.animationEnd(icon);
    await userEvent.click(icon);

    await waitFor(() => expect(iconWrapper.className).toBe('dissappear'));
    await waitFor(() => expect(setCharacterMock).toHaveBeenCalledWith('kasumi'));
    await waitFor(() => expect(incrementMock).toHaveBeenCalledTimes(1));
  });

  it('does not dissappear until the popping animation is over', async () => {
    const { getByRole, getByTestId } = renderComponent(CharacterListItem, {
      props: { name: 'kasumi' }
    });

    const icon = getByRole('img');
    const iconWrapper = getByTestId('icon-wrapper');

    await userEvent.click(icon);

    await waitFor(() => expect(iconWrapper.className).toBe(''));
    await waitFor(() => expect(setCharacterMock).not.toHaveBeenCalled());
    await waitFor(() => expect(incrementMock).not.toHaveBeenCalled());
  });
});
