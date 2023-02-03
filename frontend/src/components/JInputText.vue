<!-- eslint-disable @typescript-eslint/object-curly-spacing -->
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string
}>();
const emit = defineEmits<{(e:'update:modelValue', modelValue: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(modelValue) {
    emit('update:modelValue', modelValue);
  },
});

</script>
<template>
  <input
    v-model="value"
    class="w-full border-2 rounded-lg text-2xl py-1 pl-2 overflow-hidden break-all"
    type="text"
  >
</template>
<style scoped>
input:disabled {
    color: rgb(31 41 55 / var(--tw-text-opacity));
}
</style>
