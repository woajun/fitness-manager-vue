<script lang="ts" setup>
import { computed, ref } from 'vue';
import JSlider from './JSlider.vue';

const props = defineProps<{
  label: string
  modelValue: unknown
  items: unknown[]
  color?: 'red' | 'green' | 'purple'
}>();
const emit = defineEmits<{(e:'update:modelValue', modelValue: unknown): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(modelValue) {
    emit('update:modelValue', modelValue);
  },
});

const isBeingScolled = ref(false);
</script>
<template>
  <label>
    {{ label }}<br />
    <div
      class="scroll"
      :class="isBeingScolled ? '' : 'apple'"
      @touchstart="() => { isBeingScolled = true }"
      @touchend="() => { isBeingScolled = false }"
    >
      <JSlider
        v-model="value"
        :item-h="40"
        :items="items"
        :show-item-number="8"
      />
    </div>
  </label>
</template>
<style scoped>
.scroll {
  align-items: center;
  max-height: 3rem;
  display: flex;
}
.apple {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-width: 2px;
}
</style>
