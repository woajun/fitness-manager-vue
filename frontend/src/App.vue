<script setup lang="ts">
import axios from 'axios';
import NavBar from './pages/navigation/NavBar.vue';

function login() {
  const searchParams = new URLSearchParams(window.location.search);
  axios.get(`/login/${searchParams.get('code')}`);
}

login();
</script>
<template>
  <div class="container h-screen font-semibold text-3xl text-gray-800 w-screen fixed">
    <NavBar />
    <div>
      <RouterView />
    </div>
  </div>
</template>
