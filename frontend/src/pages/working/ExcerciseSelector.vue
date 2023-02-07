<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { ref } from 'vue';
import type { Excercise } from '@/interfaces';
import searcherSearch from '../../components/searcher';

const emit = defineEmits<{
  (e: 'cancel'):void
  (e: 'doSelect', selected: Excercise):void
}>();

const props = defineProps<{
  modelValue: Excercise,
  excercises: Excercise[],
}>();

const selected = ref<Excercise>(props.modelValue);

function select(exr: Excercise) {
  selected.value = exr;
}

function submit() {
  emit('doSelect', selected.value);
}

const list = ref<Excercise[]>(props.excercises);
function search(e:any) {
  list.value = searcherSearch(e.target.value, props.excercises, 'label');
}

</script>
<template>
  <div>
    <div>
      <input class="text-xl border-2 rounded-xl w-full h-12 px-3" @keyup="search">
    </div>
    <div class="text-xl pt-5">
      <div v-for="exr in list" :key="exr.id" @click="()=> select(exr)">
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
