<script setup lang="ts">
import { ref } from 'vue';
import JTimer from '@/components/JTimer.vue';

const milliSeconds = ref(0);
</script>
<template>
  <div>
    {{ milliSeconds }}
    <label>Fitness Manager</label>
    <JTimer v-model="milliSeconds" />
  </div>
</template>
