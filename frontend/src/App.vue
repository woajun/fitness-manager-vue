<script setup lang="ts">
import { ref } from 'vue';
import NavBar from './pages/navigation/NavBar.vue';
import CalendarReport from './pages/report/CalendarReport.vue';
import InWork from './pages/working/InWork.vue';

const isInWork = ref(true);
</script>
<template>
  <div class="container h-screen font-semibold text-3xl text-gray-800 w-screen fixed">
    <NavBar v-model="isInWork" />
    <div class="pt-6">
      <InWork v-if="!isInWork" />
      <CalendarReport v-else />
    </div>
  </div>
</template>
