<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import { useClickCounterStore } from '@/stores/clickCounter';
import FloatingBubbles from '@/components/FloatingBubbles.vue';

const characterStore = useCharacterStore();
const clickCounterStore = useClickCounterStore();

const shallowBackgroundClassName = computed(() => {
  return !characterStore.character
    ? 'from-sky-500 to-indigo-500'
    : `bg-${characterStore.character} from-deep-to-shallow`;
});
</script>

<template>
  <div class="bg-deep bg-gradient-to-b from-sky-500 to-indigo-500" title="deep"></div>
  <div class="bg-shallow bg-gradient-to-b" :class="shallowBackgroundClassName" title="shallow"></div>
  <FloatingBubbles />
</template>

<style scoped lang="scss">
.bg {
  &-deep {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -3;
  }

  &-shallow {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    z-index: -2;
  }

  &-yu {
    --tw-gradient-from: var(--yu-bg-from) var(--tw-gradient-from-position);
    --tw-gradient-to: var(--yu-bg-to) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }

  &-ayumu {
    --tw-gradient-from: var(--ayumu-bg-from) var(--tw-gradient-from-position);
    --tw-gradient-to: var(--ayumu-bg-to) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }

  &-kasumi {
    --tw-gradient-from: var(--kasumi-bg-from) var(--tw-gradient-from-position);
    --tw-gradient-to: var(--kasumi-bg-to) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }
}

.from-deep-to-shallow {
  animation: transition-from-deep-to-shallow 0.8s ease-in-out both;
}

@keyframes transition-from-deep-to-shallow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
