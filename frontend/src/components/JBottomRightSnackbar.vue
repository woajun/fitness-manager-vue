<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  modelValue: { value: boolean },
  label: string,
}>();

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
const emit = defineEmits<{(e: 'update:modelValue', modelValue: { value: boolean }): void,
}>();

let timeoutEventId = 0;
watch(() => props.modelValue, (newVal) => {
  clearTimeout(timeoutEventId);
  if (newVal.value) {
    timeoutEventId = setTimeout(() => {
      emit('update:modelValue', { value: false });
    }, 3000);
  }
});
</script>
<template>
  <Transition>
    <div v-if="props.modelValue.value" class="bg-gray-400 fixed right-4 bottom-7 rounded-lg p-4 text-white text-lg font-bold shadow-xl">
      {{ props.label }}
    </div>
  </Transition>
</template>
<style scoped>
.snackbar {
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    bottom: 30px;
    right: 1rem;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
