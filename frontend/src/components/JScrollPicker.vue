<script lang="ts" setup>
import { computed, ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker';
import type { ScrollPickerOptionable } from 'vue-scroll-picker/lib/components/picker';

const props = defineProps<{
  label: string
  modelValue: number
  options: ScrollPickerOptionable[]
  color?: 'red' | 'green' | 'purple'
}>();
const emit = defineEmits<{(e:'update:modelValue', modelValue: number): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(modelValue) {
    emit('update:modelValue', modelValue);
  },
});

const style = computed(() => {
  switch (props.color) {
    case 'red':
      return 'selected-color-red';
    case 'green':
      return 'selected-color-green';
    case 'purple':
      return 'selected-color-purple';
    default:
      return '';
  }
});

const isBeingScolled = ref(false);
</script>
<template>
  <label>
    {{ label }}<br />
    <div
      class="scroll"
      :class="isBeingScolled ? '' : 'truncate'"
      @touchstart="() => { isBeingScolled = true }"
      @touchend="() => { isBeingScolled = false }"
    >
      <VueScrollPicker
        v-model="value"
        :options="props.options"
        :class="style"
      />
    </div>
  </label>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
<style>
.scroll {
  font-size: 1.875rem;
  line-height: 2.25rem;
  border-width: 0px;
  border-radius: 0.5rem;
  align-items: center;
  max-height: 3rem;
  display: flex;
  margin-top: 0.25rem;
  border-style: solid;
  border-color: #e5e7eb;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-width: 2px;
}

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
