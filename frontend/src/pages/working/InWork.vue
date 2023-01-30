<script setup lang="ts">
import { computed, ref } from 'vue';
import Timer from '../../components/timer';

const milliSeconds = ref(0);
const timer = new Timer(milliSeconds);

const sec = computed(() => timer.getMinutes());
</script>
<template>
  <div>
    {{ sec }} :
    {{ milliSeconds }}
    <label>Fitness Manager</label>
    <div>
      <button @click="timer.start">
        Start
      </button>
      <button @click="timer.stop">
        Stop
      </button>
      <button @click="timer.reset">
        Reset
      </button>
    </div>
  </div>
</template>
