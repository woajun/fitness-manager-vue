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
    <div class="report-header fs-18">
      <div>{{ props.timeText }}</div>
      <div>{{ props.records.length }} 세트 / {{ props.records.reduce((t, c) => t + c.reps, 0) }} 회 </div>
    </div>
    <div class="report-body">
      <template v-for="set in sets" :key="`exrID-${set.exrID}`">
        <JCollapse class="report-item">
          <template #header>
            <div class="report-summary fs-12" @click="set.apple.value = !set.apple.value">
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
          <table class="report-list fs-10">
            <template v-for="(rep, i) in set.sets" :key="`kkk-${i}`">
              <div class="report-row">
                <div class="report-el">
                  {{ i + 1 }} <span class="fs-8">set</span>
                </div>
                <div class="report-el">
                  {{ rep.weight }} <span class="fs-8">kg</span>
                </div>
                <div class="report-el">
                  {{ rep.reps }} <span class="fs-8">rep</span>
                </div>
                <div class="report-el">
                  {{ msToTimeText(rep.totalMs) }} <span class="fs-8">sec</span>
                </div>
              </div>
            </template>
          </table>
        </JCollapse>
      </template>
    </div>
    <div class="report-footer">
      <button class="report-btn fs-12 bg-slate" @click="() => emit('cancel')">
        뒤로
      </button>
      <button v-if="showSubmit" class="report-btn fs-12 bg-green" @click="() => emit('submit')">
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
  border-bottom-width: 4px;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.report-body {
  padding-top: 1rem;
  flex: 1 0 0%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.report-item {
  padding-bottom: 1rem;
}

.report-summary {
  line-height: 1.5rem;
}

.report-list {
  flex-grow: 1;
  background-color: azure;
  line-height: 1.5rem;
}

.report-row {
  display: flex;
}

.report-el {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;
}

.report-footer {
  flex: 0 0 0%;
  display: flex;
  gap: 0.5rem
}

.report-btn {
  flex: 1 1 0%;
  color: rgb(248 250 252);
  border-radius: 0.5rem;
}

.bg-slate {
  background-color: rgb(51 65 85);
}

.bg-green {
  background-color: rgb(34 197 94);
}

</style>
