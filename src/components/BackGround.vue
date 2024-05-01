<script setup lang="ts">
import { computed } from 'vue';
import { shuffle } from 'lodash';
import { useCharacterStore } from '@/stores/character';

const xCoords = [5, 15, 20, 35, 40, 50, 65, 70, 85, 90] as const;
const circleClassNames = shuffle(xCoords).map((x) => `x-coord-${x}`);

const { getCharacter } = useCharacterStore();

const backGroundClassName = computed(() => {
  const character = getCharacter();
  return !character ? 'from-sky-500 to-indigo-500' : character;
});
</script>

<template>
  <div class="area bg-gradient-to-b blur-sm" :class="backGroundClassName">
    <ul class="circles">
      <li v-for="(item, index) in circleClassNames" :key="index" class="circle" :class="item"></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.kasumi {
  --tw-gradient-from: var(--kasumi-bg-from) var(--tw-gradient-from-position);
  --tw-gradient-to: var(--kasumi-bg-to) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.area {
  // background: #4e54c8;
  // background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .circle {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    bottom: -150px;
    border-radius: 50%;
    animation: animate 25s linear infinite;

    &:nth-child(1) {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.3);
      animation-delay: 0s;
      animation-duration: 16s;
    }

    &:nth-child(2) {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.25);
      animation-delay: 2s;
      animation-duration: 19s;
    }

    &:nth-child(3) {
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.15);
      animation-delay: 4s;
      animation-duration: 29s;
    }

    &:nth-child(4) {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.25);
      animation-delay: 0s;
      animation-duration: 21s;
    }

    &:nth-child(5) {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      animation-delay: 0s;
      animation-duration: 26s;
    }

    &:nth-child(6) {
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.35);
      animation-delay: 3s;
      animation-duration: 15s;
    }

    &:nth-child(7) {
      width: 110px;
      height: 110px;
      background: rgba(255, 255, 255, 0.4);
      animation-delay: 7s;
      animation-duration: 14s;
    }

    &:nth-child(8) {
      width: 25px;
      height: 25px;
      background: rgba(255, 255, 255, 0.15);
      animation-delay: 15s;
      animation-duration: 27s;
    }

    &:nth-child(9) {
      width: 15px;
      height: 15px;
      background: rgba(255, 255, 255, 0.1);
      animation-delay: 1s;
      animation-duration: 30s;
    }

    &:nth-child(10) {
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 0.4);
      animation-delay: 3s;
      animation-duration: 13s;
    }

    &.x-coord {
      &-5 {
        left: 5%;
      }
      &-15 {
        left: 15%;
      }
      &-20 {
        left: 20%;
      }
      &-35 {
        left: 35%;
      }
      &-40 {
        left: 40%;
      }
      &-50 {
        left: 50%;
      }
      &-65 {
        left: 65%;
      }
      &-70 {
        left: 70%;
      }
      &-85 {
        left: 85%;
      }
      &-90 {
        left: 90%;
      }
    }
  }
}

@keyframes animate {
  0% {
    transform: translateY(-30px);
    opacity: 1;
  }

  100% {
    transform: translateY(calc(-100vh - 200px));
  }
}
</style>
