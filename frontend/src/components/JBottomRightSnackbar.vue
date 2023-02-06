<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  modelValue: boolean,
  label: string,
}>();

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
const emit = defineEmits<{(e: 'update:modelValue', modelValue: boolean): void
}>();

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      emit('update:modelValue', false);
    }, 3000);
  }
});
</script>
<template>
  <div class="snackbar" :class="{ show: props.modelValue }">
    {{ props.label }}
  </div>
</template>
<style scoped>
.snackbar {
    visibility: hidden;
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
.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>
