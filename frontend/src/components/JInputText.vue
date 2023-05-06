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
    class="fs-15"
    type="text"
  >
</template>
<style scoped>
input {
    padding-left: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-width: 2px;
    border-radius: 0.5rem;
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    border-style: solid;
    border-color: #e5e7eb;
}
</style>
