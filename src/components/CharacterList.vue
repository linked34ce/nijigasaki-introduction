<script setup lang="ts">
import CharacterListItem from './CharacterListItem.vue';
import { CHARACTERS } from '@/constants/characters';
</script>

<template>
  <div class="character-selection grid grid-cols-3 justify-items-center">
    <template v-for="character in CHARACTERS" :key="character.id">
      <CharacterListItem :name="character.name" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.character-selection {
  z-index: 0;
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
  padding: calc((100vh - 102px) / 2) 0;
}
</style>
