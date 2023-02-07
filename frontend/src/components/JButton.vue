<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  label?: string
  color?: 'red' | 'green'
}>();

const style = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-700';
    case 'green':
      return 'bg-green-500';
    default:
      return 'bg-slate-700';
  }
});
</script>
<template>
  <button class="text-slate-50 rounded-lg text-xl" :class="style">
    {{ props.label }}
    <slot />
  </button>
</template>
<style>
button:disabled.bg-slate-700 {
  background-color: rgb(148 163 184);
}
</style>
