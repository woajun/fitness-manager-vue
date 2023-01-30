<script setup lang="ts">
import { ref } from 'vue';
import StopWatch from '../../components/stopWatch';

const timeText = ref('');
const sw = new StopWatch(timeText);

</script>
<template>
  <div>
    {{ timeText }}
    <label>Fitness Manager</label>
    <div>
      <button @click="sw.start">
        Start
      </button>
      <button @click="sw.stop">
        Stop
      </button>
      <button @click="sw.reset">
        Reset
      </button>
    </div>
  </div>
</template>
