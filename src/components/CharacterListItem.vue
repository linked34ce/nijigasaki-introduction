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
  if (!animationEnd.value || clicked.value) return;
  clicked.value = true;
  setCharacter(name);
  increment();
};

const itemClassName = computed(() => (clicked.value ? 'dissappear' : undefined));
const ringClassName = computed(() => `ring-${props.name}`);
const imgClassName = computed(() => `bg-${props.name}`);
const imgSrc = computed(() => `/characters/face/${props.name}.png`);
const imgAlt = computed(() => `icon-${props.name}`);
</script>

<template>
  <div @click="handleClickListItem(props.name)" data-testid="icon-wrapper">
    <div class="avatar" @animationend="handleAnimationEnd" :class="itemClassName">
      <div
        class="w-24 cursor-pointer rounded-full bg-blue-500 ring ring-offset-2 ring-offset-slate-600 duration-150 ease-in-out"
        :class="ringClassName"
      >
        <img :class="imgClassName" :src="imgSrc" :alt="imgAlt" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ring-kasumi {
  --tw-ring-color: var(--kasumi-primary-color);

  .bg-kasumi {
    background-color: var(--kasumi-icon-color);
  }
}

.avatar {
  animation: pop 1.2s ease-in-out both;
}

.dissappear {
  animation: dissappear 0.8s ease-out both;
}

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

@keyframes dissappear {
  0% {
    opacity: 1;
    rotate: 0deg;
    transform: translateX(0);
    transform-origin: center;
  }

  100% {
    opacity: 0;
    rotate: -300deg;
    transform: translateX(-150%);
    transform-origin: -100% center;
  }
}
</style>
