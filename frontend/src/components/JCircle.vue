<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isRed?: boolean | ''
}>();

const style = computed(() => {
  if (props.isRed) {
    return 'bg-red-600 border-red-700';
  }
  return 'bg-neutral-500 ';
});

</script>
<template>
  <div class="w-28 h-28 text-center rounded-full text-white pt-3" :class="style">
    <slot />
  </div>
</template>
