<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { ref } from 'vue';
import excercises from '../../data/excercises';
import type { Excercise } from '@/interfaces';

const emit = defineEmits<{
  (e: 'cancel'):void
  (e: 'doSelect', selected: Excercise):void
}>();

const props = defineProps<{
  modelValue: Excercise,
}>();

const selected = ref<Excercise>(props.modelValue);

function select(exr: Excercise) {
  selected.value = exr;
}

function submit() {
  emit('doSelect', selected.value);
}
</script>
<template>
  <div>
    <div>
      <input class="text-xl border-2 rounded-xl w-full h-12 px-3">
    </div>
    <div class="text-xl pt-5">
      <div v-for="exr in excercises" :key="exr.id" @click="()=> select(exr)">
        <span :class="{ 'text-green-500': selected.id === exr.id }">{{ exr.label }}</span>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-2 pt-5 my-3">
      <button class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="emit('cancel')">
        취소
      </button>
      <button class="text-slate-50 rounded-lg bg-green-500 h-14 text-xl" @click="submit">
        변경
      </button>
    </div>
  </div>
</template>
