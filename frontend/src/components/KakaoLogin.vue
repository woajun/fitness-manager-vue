<script lang="ts" setup>
import KakaoAuth from './kakaoAuth';

</script>
<template>
  <button @click="KakaoAuth.login()">
    <img src="@/assets/kakao_login_medium_narrow.png" alt="">
  </button>
</template>
