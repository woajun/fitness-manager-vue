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

</script>
<template>
  <div class="search-container">
    <input class="search fs-12" @keyup="search">
  </div>
  <div class="list-container fs-12">
    <div v-for="exr in list" :key="exr.exrId" @click="()=> select(exr)">
      <span :class="{ 'txt-green': selected.exrId === exr.exrId }">{{ exr.exrName }}</span>
    </div>
  </div>
  <div class="btn-container">
    <button class="btn fs-12 bg-slate" @click="emit('cancel')">
      취소
    </button>
    <button class="btn fs-12 bg-green" @click="submit">
      변경
    </button>
  </div>
</template>
<style scoped>
  .search-container {
    flex: 0;
    padding-bottom: 1rem;
  }

  .search {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-width: 2px;
    border-radius: 0.75rem;
    width: 100%;
    height: 3rem;
  }

  .list-container {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .btn-container {
    padding-top: 1rem;
    flex: 0;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .btn {
    flex: 1 0 0%;
    color: rgb(248 250 252);
    border-radius: 0.5rem;
    height: 3rem;
  }
</style>
