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
    <div class="footer" />
  </div>
</template>
<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
}

.header {
  flex: 0 0 60px;
}

.main {
  padding-left: 1rem;
  padding-right: 1rem;
  flex: 1;
  display: flex;
}

.footer {
  flex: 0 0 120px;
}
</style>
<style>
body {
  margin: 0;
}

.fs-25 {
  font-size: 2.5rem;
}

.fs-22 {
  font-size: 2.25rem;
}

.fs-18 {
  font-size: 1.875rem;
}

.fs-15 {
  font-size: 1.5rem;
}

.fs-12 {
  font-size: 1.25rem;
}

.fs-10 {
  font-size: 1rem;
}

.fs-8 {
  font-size: 0.8rem;
}

.fw-6 {
  font-weight: 600;
}

.txt-gray {
  color: rgb(107 114 128);
}

.txt-green {
  color: rgb(34 197 94);
}

.bg-slate {
  background-color: rgb(51 65 85);
}

.bg-green {
  background-color: rgb(34 197 94);
}

.bg-red {
  background-color: rgb(185 28 28);
}
</style>
