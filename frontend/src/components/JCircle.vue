<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  color?: 'slate' | 'red' | 'gray'
}>();

const style = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-600 border-red-700';
    case 'slate':
      return 'bg-slate-700';
    default:
      return 'bg-neutral-500 ';
  }
});

</script>
<template>
  <div class="w-28 h-28 text-center rounded-full text-white pt-3" :class="style">
    <slot />
  </div>
</template>
