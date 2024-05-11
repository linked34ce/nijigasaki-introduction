import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCharacterStore } from '@/stores/character';

describe('useCharacterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can store the character name given', () => {
    const characterStore = useCharacterStore();
    characterStore.setCharacter('kasumi');
    expect(characterStore.character).toBe('kasumi');
  });

  it('deletes the character name when reset', () => {
    const characterStore = useCharacterStore();
    characterStore.setCharacter('kasumi');
    characterStore.reset();
    expect(characterStore.character).toBeUndefined();
  });
});
