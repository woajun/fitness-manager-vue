<!-- eslint-disable no-spaced-func -->
<!-- eslint-disable no-trailing-spaces -->
<!-- eslint-disable no-plusplus -->
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: number;
}>();

const emits = defineEmits<{
  (e:'update:modelValue', value: number): void 
}>();

const milliSeconds = ref(props.modelValue);
const Interval = ref(0);

function startTimer() {
  milliSeconds.value++;
  emits('update:modelValue', milliSeconds.value);
}

function start() {
  clearInterval(Interval.value);
  Interval.value = setInterval(startTimer, 10);
}

function stop() {
  clearInterval(Interval.value);
}

function reset() {
  clearInterval(Interval.value);
  milliSeconds.value = 0;
  emits('update:modelValue', milliSeconds.value);
}
</script>
<template>
  <div>
    <button @click="start">
      Start
    </button>
    <button @click="stop">
      Stop
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>
<style></style>
