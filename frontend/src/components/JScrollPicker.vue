<script lang="ts" setup>
import { VueScrollPicker } from 'vue-scroll-picker';
import {
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  ref,
  watch,
} from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label: string;
    unit: string;
    options: number;
  }>(),
  {},
);
const emit = defineEmits(['update:modelValue']);

const newValue = ref(props.modelValue);

const computedVal = computed({
  get() {
    return newValue.value;
  },
  set(value) {
    newValue.value = value;
    emit('update:modelValue', value);
  },
});

watch(
  () => props.modelValue,
  (value) => {
    newValue.value = value;
  },
);

const options = computed(() => {
  const result = [];
  for (let i = 0; i <= props.options; i += 1) {
    result.push(i);
  }
  return result;
});

</script>
<template>
  <div class="flex text-center">
    <div class="flex-1 vertical-center">
      {{ props.label }}
    </div>
    <div class="flex-1 text-4xl vertical-center max-h-24 truncate">
      <VueScrollPicker v-model="computedVal" :options="options" />
    </div>
    <div class="flex-1 vertical-center">
      {{ props.unit }}
    </div>
  </div>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
