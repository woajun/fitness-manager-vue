<script setup lang="ts">
import { ref } from 'vue';
import JTimer from '@/components/JTimer.vue';

const seconds = ref(0);
</script>
<template>
  <div>
    <label>Fitness Manager</label>
    <JTimer v-model="seconds" />
  </div>
</template>
