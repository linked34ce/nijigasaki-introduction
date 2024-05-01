import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', () => {
  const character = ref<string>();

  const getCharacter = (): string | undefined => {
    return character.value;
  };

  const setCharacter = (newCharacter: string) => {
    character.value = newCharacter;
  };

  return { character, getCharacter, setCharacter };
});
