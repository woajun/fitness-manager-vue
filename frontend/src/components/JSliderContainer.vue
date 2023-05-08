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
    {{ label }}
    <div
      class="scroll"
      :class="isBeingScolled ? '' : 'overflowHidden'"
      @touchstart="() => { isBeingScolled = true }"
      @touchend="() => { isBeingScolled = false }"
    >
      <JSlider
        v-model="value"
        :class="isBeingScolled ? '' : 'border0px'"
        :item-h="40"
        :items="items"
        :show-item-number="8"
      />
    </div>
  </label>
</template>
<style scoped>
.scroll {
  max-height: 40px;
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 0.5rem;
}
.overflowHidden {
  overflow: hidden;
  border: 2px solid #e5e7eb;
}

.border0px {
  border: 0px
}
</style>
