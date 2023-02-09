<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { computed } from 'vue';
import type { CalendarData } from '@/interfaces';
import excercises from '@/data/excercises';
import { msToTimeText } from '@/components/helper';
import JJCollapse from '@/components/JJCollapse.vue';

const props = defineProps<{
  calendarData: CalendarData
}>();

function getExrName(id: number) {
  return excercises.find((e) => e.id === id)?.label;
}

type Work = {
  startTime: string;
  totalMs: number;
  id: number;
  sets: {
    id: number;
    exrId: number;
    recordTime: string;
    reps: number;
    restMs: number;
    totalMs: number;
    weight: number;
  }[];
};

function sortByExcercise(work: Work) {
  const exrIds = [...new Set(work.sets.map((set) => set.exrId))];
  return exrIds.map((exrId) => ({
    exrId,
    exrName: getExrName(exrId),
    sets: work.sets.filter((w) => w.exrId === exrId),
  }));
}
const workSortedByExcercise = computed(() => props.calendarData.map((work) => ({...work, exrs: sortByExcercise(work)})));

function toHHMM(strDate: string) {
  const date = new Date(strDate);
  return `${date.getHours()}:${date.getMinutes()}`;
}
</script>
<template>
  <div class="rem34">
    <div v-for="(work, i) in workSortedByExcercise" :key="work.id">
      <div class="text-lg py-3 border-t-2">
        <div>
          {{ i + 1 }}차 운동-
          {{ toHHMM(work.startTime) }} / {{ work.sets.length }}sets / {{ work.sets.reduce((t, c) => t + c.reps, 0) }}reps
        </div>
      </div>
      <div class="text-sm font-light">
        <div v-for="exr in work.exrs" :key="`${work.id}-${exr.exrId}`" class="">
          <JJCollapse>
            <template #header>
              <label>
                <span class="font-bold">{{ exr.exrName }}</span> -
                <span class="">{{ exr.sets.length }}</span> set
                <span class="">{{ exr.sets.reduce((t, c) => t + c.reps, 0) }}</span> rep
                {{ msToTimeText(exr.sets.reduce((t, c) => t + c.totalMs, 0)) }}
              </label>
            </template>
            <div class="font-light bg-gray-50">
              <table class="table-auto w-full ml-3">
                <tr v-for="(set, j) in exr.sets" :key="set.id">
                  <td>
                    {{ j + 1 }}set
                  </td>
                  <td>
                    {{ set.weight }}kg
                  </td>
                  <td>
                    {{ set.reps }}rep
                  </td>
                  <td>
                    {{ msToTimeText(set.totalMs) }}
                  </td>
                </tr>
              </table>
            </div>
          </JJCollapse>
        </div>
      </div>
    </div>
  </div>
  <div class="grid gap-4 my-3">
    <slot />
  </div>
</template>
<style>
.expandable {
  margin-top: -100%;
  transition: all 0.5s;
}
.expandable.expanded {
  margin-top: 0;
}
.rem34 {
  height: 30rem;
  overflow-y: auto;
}
</style>
