<!-- eslint-disable no-spaced-func -->
<script lang="ts" setup>
import { TransitionGroup, computed, ref } from 'vue';
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
            <div class="report-summary" @click="set.apple.value = !set.apple.value">
              <label class="report-summary-exr">
                {{ set.exrName }}
              </label>
              <div class="report-row">
                <div class="report-el">
                  {{ set.sets.length }} set
                </div>
                <div class="report-el">
                  0-0 kg
                </div>
                <div class="report-el">
                  {{ set.sets.reduce((t, c) => t + c.reps, 0) }} rep
                </div>
                <div class="report-el">
                  {{ msToTimeText(set.sets.reduce((t, c) => t + c.totalMs, 0)) }} sec
                </div>
              </div>
            </div>
          </template>
          <table class="report-list">
            <template v-for="(rep, i) in set.sets" :key="`kkk-${i}`">
              <div class="report-row">
                <div class="report-el">
                  {{ i + 1 }} <span class="font-sm">set</span>
                </div>
                <div class="report-el">
                  {{ rep.weight }} <span class="font-sm">kg</span>
                </div>
                <div class="report-el">
                  {{ rep.reps }} <span class="font-sm">rep</span>
                </div>
                <div class="report-el">
                  {{ msToTimeText(rep.totalMs) }} <span class="font-sm">sec</span>
                </div>
              </div>
            </template>
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

.report-summary {
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.report-list {
  flex-grow: 1;
  font-size: 1rem;
  background-color: azure;
}

.report-row {
  display: flex;
}

.report-el {
  flex: 1 1 auto;
}

.font-sm {
  font-size: 0.8rem;
}

.report-footer {
  flex: 0 0 0%;
}

</style>
