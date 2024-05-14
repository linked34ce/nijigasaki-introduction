<script setup lang="ts">
import CharacterListItem from './CharacterListItem.vue';
import { characters } from '@/constants/characters';
</script>

<template>
  <div class="character-selection">
    <template v-for="(character, index) in characters" :key="index">
      <CharacterListItem :name="character.name" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.character-selection {
  z-index: 0;
  padding: calc((100vh - 102px) / 2) calc((100vw - 102px) / 2);
}
</style>
