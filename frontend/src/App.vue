<script setup lang="ts">
import NavBar from './pages/navigation/NavBar.vue';

</script>
<template>
  <div class="new-container">
    <div class="header">
      <NavBar />
    </div>
    <div class="main">
      <RouterView />
    </div>
    <div class="footer" />
  </div>
</template>
<style>
.new-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
}

.header {
  height: 60px;
}

.main {
  flex: 1;
}

.footer {
  height: 90px;
}
</style>
