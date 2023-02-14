<script lang="ts" setup>
import kakao from './kakao';

const k = kakao.use();
function loginWithKakao() {
  k.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5173',
  });
}

</script>
<template>
  <button @click="loginWithKakao()">
    <img src="@/assets/kakao_login_medium_narrow.png" alt="">
  </button>
</template>
