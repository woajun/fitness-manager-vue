<script lang="ts" setup>
import { ref } from 'vue';
import JSlider from '@/components/JSlider.vue';

const items = ['00', '10', '20', '30', '40', '50', '60'];
const sltItem = ref('40');

</script>

<template>
  {{ sltItem }}
  <JSlider
    v-model="sltItem"
    :items="items"
  />
</template>
