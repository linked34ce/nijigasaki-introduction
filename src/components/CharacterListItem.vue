<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '@/stores/character';
import { useClickCounterStore } from '@/stores/clickCounter';

const props = defineProps<{ name: string }>();

const animationEnd = ref(false);
const clicked = ref(false);

const characterStore = useCharacterStore();
const clickCounterStore = useClickCounterStore();

const handleAnimationEnd = () => {
  animationEnd.value = true;
};

const handleClickListItem = (name: string) => {
  if (animationEnd.value && !clicked.value && clickCounterStore.clickCount === 0) {
    clicked.value = true;
    characterStore.setCharacter(name);
    clickCounterStore.increment();
  }
};

const itemClassName = computed(() => {
  return clickCounterStore.clickCount === 0
    ? 'pop-up'
    : clicked.value && characterStore.character === props.name
      ? 'roll-out'
      : 'fade-out';
});

const ringClassName = computed(() => `ring-${props.name}`);
const imgClassName = computed(() => `bg-${props.name}`);
const imgSrc = computed(() => `/characters/face/${props.name}.png`);
const imgAlt = computed(() => `icon-${props.name}`);
</script>

<template>
  <div @click="handleClickListItem(props.name)">
    <div class="avatar" @animationend="handleAnimationEnd" :class="itemClassName" data-testid="icon">
      <div
        class="w-20 cursor-pointer rounded-full bg-blue-500 ring ring-offset-2 ring-offset-slate-600 duration-150 ease-in-out md:w-24"
        :class="ringClassName"
      >
        <img :class="imgClassName" :src="imgSrc" :alt="imgAlt" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ring-yu {
  --tw-ring-color: var(--yu-primary-color);

  .bg-yu {
    background-color: var(--yu-icon-color);
  }
}

.ring-ayumu {
  --tw-ring-color: var(--ayumu-primary-color);

  .bg-ayumu {
    background-color: var(--ayumu-icon-color);
  }
}

.ring-kasumi {
  --tw-ring-color: var(--kasumi-primary-color);

  .bg-kasumi {
    background-color: var(--kasumi-icon-color);
  }
}

.pop-up {
  animation: pop-up 1.2s ease-in-out both;
}

.roll-out {
  animation: roll-out 0.8s ease-out both;
}

.fade-out {
  animation: fade-out 0.4s ease-out both;
}

@keyframes pop-up {
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

@keyframes roll-out {
  0% {
    opacity: 1;
    rotate: 0deg;
    transform: translateX(0);
    transform-origin: center;
    z-index: 0;
  }

  99% {
    z-index: 0;
  }

  100% {
    opacity: 0;
    rotate: -300deg;
    transform: translateX(-150%);
    transform-origin: -100% center;
    z-index: -5;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    z-index: 0;
  }

  99% {
    z-index: 0;
  }

  100% {
    opacity: 0;
    z-index: -5;
  }
}
</style>
