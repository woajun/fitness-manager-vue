<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Exr, Set } from './interfaces';
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
  <div class="report-container">
    <div class="report-header">
      <div>{{ props.timeText }}</div>
      <div>{{ props.records.length }} 세트 / {{ props.records.reduce((t, c) => t + c.reps, 0) }} 회 </div>
    </div>
    <div class="report-body">
      <template v-for="set in sets" :key="`exrID-${set.exrID}`">
        <JCollapse>
          <template #header>
            <div class="report-item" @click="set.apple.value = !set.apple.value">
              <label>
                {{ set.exrName }}
              </label>
              <table>
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
          </template>
          <table class="report-list">
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
      </template>
    </div>
    <div class="report-footer">
      <button class="text-slate-50 rounded-lg bg-slate-700 text-xl" @click="emit('cancel')">
        뒤로
      </button>
      <button v-if="showSubmit" class="text-slate-50 rounded-lg bg-green-500 text-xl" @click="submit">
        운동종료
      </button>
    </div>
  </div>
</template>
<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.report-header {
  flex: 0 0 0%;
  font-size: 1.875rem;
  border-bottom-width: 4px;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.report-body {
  flex: 0 0 70%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.report-item {
  font-size: 1.25rem;
}

.report-list {
  font-size: 0.8rem;
}

.report-footer {
  flex: 0 0 0%;
}

</style>
