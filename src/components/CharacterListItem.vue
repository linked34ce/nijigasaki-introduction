<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '@/stores/character';
import { useClickCounterStore } from '@/stores/clickCounter';

const props = defineProps<{ name: string }>();

const animationEnd = ref(false);
const clicked = ref(false);

const { setCharacter } = useCharacterStore();
const { increment } = useClickCounterStore();

const handleAnimationEnd = () => {
  animationEnd.value = true;
};

const handleClickListItem = (name: string) => {
  if (!animationEnd.value) return;
  clicked.value = true;
  setCharacter(name);
  increment();
};

const itemClassName = computed(() => (clicked.value ? 'dissappear' : undefined));

const imgAlt = computed(() => `icon-${props.name}`);
</script>

<template>
  <div :class="itemClassName" @click="handleClickListItem(props.name)" data-testid="icon-wrapper">
    <div class="avatar" @animationend="handleAnimationEnd">
      <div
        class="w-24 cursor-pointer rounded-full bg-blue-500 ring ring-[#e7d600] ring-offset-2 ring-offset-slate-600 duration-150 ease-in-out hover:scale-110"
      >
        <img class="bg-[#e7d600]/[.3]" src="/characters/face/kasumi.png" :alt="imgAlt" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  animation: pop 1.2s ease-in-out both;

  @keyframes pop {
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

.dissappear {
  animation: dissappear 0.8s ease-out both;

  @keyframes dissappear {
    0% {
      opacity: 1;
      rotate: 0;
      transform: translateX(0);
      transform-origin: center;
    }

    100% {
      opacity: 0;
      rotate: -300deg;
      transform: translateX(-148px);
      transform-origin: -100px center;
    }
  }
}
</style>
