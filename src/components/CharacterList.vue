<script setup lang="ts">
import CharacterSelectionIcon from './CharacterListItem.vue';
</script>

<template>
  <div class="character-selection">
    <CharacterSelectionIcon />
  </div>
</template>

<style scoped lang="scss">
.character-selection {
  z-index: 0;
  padding: calc((100vh - 102px) / 2) calc((100vw - 102px) / 2);
}
</style>
