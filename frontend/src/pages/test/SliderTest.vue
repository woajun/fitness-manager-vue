<script lang="ts" setup>
import { ref } from 'vue';
import JSlider from '@/components/JSlider.vue';

const items = ['00', '10', '20', '30', '40', '50', '60'];
const sltItem = ref('40');

</script>

<template>
  <div class="container">
    <div>
      {{ sltItem }}
    </div>
    <div class="center">
      <JSlider
        v-model="sltItem"
        :items="items"
        :item-h="30"
        :show-item-number="8"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.center {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
