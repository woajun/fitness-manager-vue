<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { ref } from 'vue';
import type { Exr } from './interfaces';
import searcherSearch from '../../components/searcher';

const emit = defineEmits<{
  (e: 'cancel'):void
  (e: 'doSelect', selected: Exr):void
}>();

const props = defineProps<{
  modelValue: Exr,
  excercises: Exr[],
  useEntire?: boolean,
}>();

const selected = ref<Exr>(props.modelValue);

function select(exr: Exr) {
  selected.value = exr;
}

function submit() {
  emit('doSelect', selected.value);
}

const list = ref<Exr[]>(props.excercises);
function search(e:any) {
  list.value = searcherSearch(e.target.value, props.excercises, 'label');
}

const entire: Exr = {
  exrId: -1,
  exrName: '전체',
  kgMax: 0,
  kgMin: 0,
  kgStart: 0,
  kgUnit: 0,
  repStart: 0,
};

</script>
<template>
  <div class="flex-auto">
    <input class="text-xl border-2 rounded-xl w-full h-12 px-3" @keyup="search">
  </div>
  <div class="flex-auto overflow-auto text-xl mt-5">
    <div v-if="props.useEntire" class="border-b" @click="()=> select(entire)">
      <span :class="{ 'text-green-500': selected.exrId === entire.exrId }">{{ entire.exrName }}</span>
    </div>
    <div v-for="exr in list" :key="exr.exrId" @click="()=> select(exr)">
      <span :class="{ 'text-green-500': selected.exrId === exr.exrId }">{{ exr.exrName }}</span>
    </div>
  </div>
  <div class="flex-auto grid gap-4 grid-cols-2 pt-5 my-3">
    <button class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="emit('cancel')">
      취소
    </button>
    <button class="text-slate-50 rounded-lg bg-green-500 h-14 text-xl" @click="submit">
      변경
    </button>
  </div>
</template>
