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
    selectedColor?: 'red' | 'purple' | 'green';
  }>(),
  { selectedColor: undefined },
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
      <VueScrollPicker
        v-model="computedVal"
        :options="options"
        :class="props.selectedColor ? `selected-color-${props.selectedColor}` : ''"
      />
    </div>
    <div class="flex-1 vertical-center">
      {{ props.unit }}
    </div>
  </div>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
<style>
.selected-color-red .vue-scroll-picker-item-selected {
  color: rgb(153 27 27 / var(--tw-text-opacity));
}
.selected-color-purple .vue-scroll-picker-item-selected {
  color: rgb(91 33 182 / var(--tw-text-opacity));
}
.selected-color-green .vue-scroll-picker-item-selected {
  color: rgb(22 101 52 / var(--tw-text-opacity));
}
</style>
