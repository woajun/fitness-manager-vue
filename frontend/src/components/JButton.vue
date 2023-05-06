<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  label?: string
  color?: 'red' | 'green'
}>();

const style = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red';
    case 'green':
      return 'bg-green';
    default:
      return 'bg-slate';
  }
});
</script>
<template>
  <button class="fs-12" :class="style">
    {{ props.label }}
    <slot />
  </button>
</template>
<style scoped>
button:disabled {
  background-color: rgb(148 163 184);
}

button {
  border-width: 0;
  color: rgb(248 250 252);
  border-radius: 0.5rem;
}
</style>
