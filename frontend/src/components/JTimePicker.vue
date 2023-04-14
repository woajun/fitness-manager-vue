<script lang="ts" setup>
import { ref } from 'vue';
import JSlider from './JSlider.vue';

function to00(num: number) {
  let str = String(num);
  if (str.length === 1) {
    str = `0${str}`;
  }
  return str;
}

const sltH = ref(0);
const sltM = ref(0);

const valH = ref('00');
const valM = ref('00');

const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const minutes = ['00', '10', '20', '30', '40', '50'];

function setHour(h: number) {
  if (h === sltH.value) return;
  sltH.value = h;
  valH.value = to00(h);
}

function setMin(m: number) {
  if (m === sltM.value) return;
  sltM.value = m;
  valM.value = to00(m);
}

</script>
<template>
  <div class="flex">
    zzzzzzzzz
    <JSlider v-model="valH" :items="hours" @value-changed="(val: string) => setHour(Number(val))" />
    <div class="timepicker-separator">
      :
    </div>
    <JSlider v-model="valM" :items="minutes" @value-changed="(val: string) => setMin(Number(val))" />
  </div>
</template>
<style>
.flex {
  display: flex;
}
.timepicker-separator {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-family: "SpoqaB", serif;
}

</style>
