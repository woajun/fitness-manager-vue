<!-- eslint-disable no-plusplus -->
<script setup lang="ts">
import { ref } from 'vue';

const seconds = ref(0);
const tens = ref(0);
let Interval = 0;

function startTimer() {
  tens.value++;

  if (tens.value > 99) {
    seconds.value++;
    tens.value = 0;
  }
}

function start() {
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
}

function stop() {
  clearInterval(Interval);
}

function reset() {
  clearInterval(Interval);
  tens.value = 0;
  seconds.value = 0;
}
</script>
<template>
  <div>
    <p><input v-model="seconds" />:<input v-model="tens" /></p>
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
