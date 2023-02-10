<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Exr, Set } from '@/interfaces';
import { msToTimeText } from '../../components/helper';
import JCollapse from '../../components/JCollapse.vue';

const emit = defineEmits<{
  (e: 'cancel'):void
  (e: 'submit'):void
}>();

const props = defineProps<{
  records: Set[],
  excercises: Exr[],
  timeText: string,
  showSubmit?: boolean,
}>();

function submit() {
  emit('submit');
}

function getExrIDsWithExrOrder() {
  const exrIDs = props.records.map((e) => e.exrId);
  return exrIDs.filter((e, i) => exrIDs.indexOf(e) === i);
}

function getExrName(id: number) {
  return props.excercises.find((e) => e.exrId === id)?.exrName;
}

const sets = computed(() => {
  const uniqExrIds = getExrIDsWithExrOrder();
  const separated = uniqExrIds.map((exrID, i) => ({
    exrID,
    exrName: getExrName(exrID),
    order: i,
    sets: props.records.filter((e) => e.exrId === exrID),
    apple: ref(false),
  }));

  return separated;
});

</script>
<template>
  <div>
    <div class="text-3xl py-3 border-b-4">
      <div>{{ props.timeText }}</div>
      <div>{{ props.records.length }} 세트 / {{ props.records.reduce((t, c) => t + c.reps, 0) }} 회 </div>
    </div>
    <div class="text-xl h-80 overflow-auto">
      <div v-for="set in sets" :key="`exrID-${set.exrID}`" class="border-b-2">
        <div @click="set.apple.value = !set.apple.value">
          <label>
            {{ set.exrName }}
          </label>
          <table class="table-auto w-full">
            <tr>
              <td>
                {{ set.sets.length }}set
              </td>
              <td>
                0-0kg
              </td>
              <td>
                {{ set.sets.reduce((t, c) => t + c.reps, 0) }}rep
              </td>
              <td>
                {{ msToTimeText(set.sets.reduce((t, c) => t + c.totalMs, 0)) }}
              </td>
            </tr>
          </table>
        </div>
        <JCollapse :show="set.apple.value" class="font-light bg-gray-50">
          <table class="table-auto w-full ml-3">
            <tr v-for="(rep, i) in set.sets" :key="`kkk-${i}`">
              <td>
                {{ i + 1 }}set
              </td>
              <td>
                {{ rep.weight }}kg
              </td>
              <td>
                {{ rep.reps }}rep
              </td>
              <td>
                {{ msToTimeText(rep.totalMs) }}
              </td>
            </tr>
          </table>
        </JCollapse>
      </div>
    </div>
  </div>
  <div class="grid gap-4 pt-5 my-3" :class="{ 'grid-cols-2': showSubmit }">
    <button class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="emit('cancel')">
      뒤로
    </button>
    <button v-if="showSubmit" class="text-slate-50 rounded-lg bg-green-500 h-14 text-xl" @click="submit">
      운동종료
    </button>
  </div>
</template>
