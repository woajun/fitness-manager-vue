<script setup lang="ts">
import NavBar from './pages/navigation/NavBar.vue';

</script>
<template>
  <div class="app-container">
    <div class="header">
      <NavBar />
    </div>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>
<style>
.app-container {
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
  flex: 1 1 auto;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}

.footer {
  height: 30px;
}
</style>
