<script lang="ts" setup>
import { to00 } from '../../components/helper';
import data from '../../data/calendarData';

const props = defineProps<{
  date: Date;
  style: string
}>();

function toDateString(date:Date) {
  return `${date.getFullYear()}-${to00(date.getMonth() + 1)}-${to00(date.getDate())}`;
}

function getTime(date: Date) {
  const el = data.find((e) => e.date === toDateString(date));
  return el ? el.time : '';
}

function getSet(date: Date) {
  const el = data.find((e) => e.date === toDateString(date));
  return el ? `${el.set}set` : '';
}

function getRep(date: Date) {
  const el = data.find((e) => e.date === toDateString(date));
  return el ? `${el.rep}rep` : '';
}

</script>
<template>
  <div>
    <p v-if="props.date" class="text-base font-medium h-5">
      {{ props.date.getDate() }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ getTime(props.date) }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ getSet(props.date) }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ getRep(props.date) }}
    </p>
  </div>
</template>
