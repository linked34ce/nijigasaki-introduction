<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';

const { setCharacter } = useCharacterStore();

const handleClickListItem = () => {
  setCharacter('kasumi');
};
</script>

<template>
  <div class="avatar transition" @click="handleClickListItem">
    <div
      class="w-24 cursor-pointer rounded-full bg-blue-500 ring ring-[#e7d600] ring-offset-2 ring-offset-slate-600 duration-150 ease-in-out hover:scale-110"
    >
      <img class="bg-[#e7d600]/[.3]" src="/characters/face/kasumi.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  animation: fade-in-bottom 1.2s ease-in-out both;

  @keyframes fade-in-bottom {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    50% {
      transform: translateY(-50px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
