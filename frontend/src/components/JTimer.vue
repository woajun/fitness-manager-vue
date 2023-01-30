<!-- eslint-disable no-plusplus -->
<script setup lang="ts">
import { ref } from 'vue';

const seconds = ref(0);
const tens = ref(0);
const Interval = ref(0);

function startTimer() {
  tens.value++;
  if (tens.value > 99) {
    seconds.value++;
    tens.value = 0;
  }
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
  tens.value = 0;
  seconds.value = 0;
}
</script>
<template>
  <div>
    <input v-model="seconds" />:<input v-model="tens" />
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
