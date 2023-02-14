<script setup lang="ts">
import NavBar from './pages/navigation/NavBar.vue';

</script>
<template>
  <div class="container h-screen font-semibold text-3xl text-gray-800 w-screen fixed">
    <NavBar />
    <div class="pt-6">
      <RouterView />
    </div>
  </div>
</template>
