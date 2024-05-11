import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useClickCounterStore = defineStore('clickCounter', () => {
  const clickCount = ref(0);

  const increment = () => clickCount.value++;

  const reset = () => {
    clickCount.value = 0;
  };

  return { clickCount, increment, reset };
});
