<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import JMultiChart from '../../components/JMultiChart.vue';
import selectorOptions from '../../data/selectorOptions';
import JBottomSheet from '../../components/JBottomSheet.vue';
import ExcerciseSelector from './ExcerciseSelector.vue';
import RecordReport from './RecordReport.vue';
import excercises from '../../data/excercises';
import JInputText from '../../components/JInputText.vue';
import JScrollPicker from '../../components/JScrollPicker.vue';
import JBottomRightSnackbar from '../../components/JBottomRightSnackbar.vue';
import type { Exr, Set } from './interfaces';
import MyTimer from './timer/MyTimer.vue';

const excercise = ref<Exr>(excercises[0]);

const visibleExrModal = ref(false);
const visibleReportModal = ref(false);

const weight = ref(excercise.value.kgStart);
const rep = ref(excercise.value.repStart);
const sec = ref(0);

function selectExcercise(aExcercise: Exr) {
  weight.value = aExcercise.kgStart;
  rep.value = aExcercise.repStart;
  excercise.value = aExcercise;
  visibleExrModal.value = false;
}

const isSnackbarShow = ref({ value: false });

type Result = {
  memberId: number,
  startTime: Date,
  totalMs: number,
  sets: Set[],
};

const result = reactive<Result>({
  memberId: 0,
  startTime: new Date(),
  totalMs: 10,
  sets: [],
});

function onTimerStart() {
  result.startTime = new Date();
}

function onTimerRecord(ms: number) {
  result.sets.push({
    exrId: excercise.value.exrId,
    weight: weight.value,
    reps: rep.value,
    restMs: sec.value,
    totalMs: ms,
    recordTime: new Date(),
  });
  isSnackbarShow.value = { value: true };
}

function cancelRecord() {
  const popped = result.sets.pop();
  if (!popped) return;
  isSnackbarShow.value = { value: false };
}

function onTimerFinish(ms: number) {
  result.totalMs = ms;
  axios.post('/record', result);
  visibleReportModal.value = true;
}

function onCheckedReport() {
  result.sets = [];
  visibleReportModal.value = false;
}

const nowExcerciseRep = computed(() => result.sets.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + c.reps : t), 0));
const nowExcerciseSet = computed(() => result.sets.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + 1 : t), 0));

const restSec = computed(() => (result.sets.length > 0 ? sec.value : 5));

</script>
<template>
  <MyTimer
    :rest-sec="restSec"
    @start="onTimerStart"
    @record="onTimerRecord"
    @finish="onTimerFinish"
  >
    <template #circle>
      <p
        @click="() => {
          visibleReportModal = true;
        }"
      >
        <span class="fs-22">{{ nowExcerciseSet }}</span>
        <span class="fs-12">/{{ result.sets.length }}</span>
      </p>
      <p class="fs-12">
        Set
      </p>
    </template>
    <div class="chart-container">
      <JMultiChart :data="result.sets" :now-exr-id="excercise.exrId" />
    </div>

    <div class="excercise-container">
      <div class="excercise-input" @click="visibleExrModal = true">
        <JInputText v-model="excercise.exrName" readonly />
      </div>
      <div class="excercise-current txt-gray">
        <span class="fs-15"> {{ nowExcerciseRep }} </span>
        <span class="fs-12">rep</span>
      </div>
    </div>

    <div class="condition-container">
      <div class="condition">
        <JScrollPicker
          v-model="weight"
          label="kg"
          :options="selectorOptions.weight"
          color="red"
        />
      </div>
      <div class="condition">
        <JScrollPicker
          v-model="rep"
          label="rep"
          :options="selectorOptions.rep"
          color="purple"
        />
      </div>
      <div class="condition">
        <JScrollPicker
          v-model="sec"
          label="sec"
          :options="selectorOptions.sec"
          color="green"
        />
      </div>
    </div>
  </MyTimer>

  <Teleport to="body">
    <JBottomSheet :show="visibleExrModal">
      <ExcerciseSelector
        v-model="excercise"
        :excercises="excercises"
        @cancel="visibleExrModal = false"
        @do-select="selectExcercise"
      />
    </JBottomSheet>
  </Teleport>

  <Teleport to="body">
    <JBottomSheet :show="visibleReportModal">
      <RecordReport
        :records="result.sets"
        :excercises="excercises"
        :time-text="''"
        :show-submit="true"
        @cancel="visibleReportModal = false"
        @submit="onCheckedReport"
      />
    </JBottomSheet>
  </Teleport>

  <Teleport to="body">
    <JBottomRightSnackbar v-model="isSnackbarShow" label="기록취소" @click="cancelRecord" />
  </Teleport>
</template>
<style>
.chart-container {
  flex: 1 0 0%;
  border-width: 1px;
}

.excercise-container {
  flex: 1 0 0%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.excercise-input {
  flex: 1 0 0%;
}

.excercise-current {
  flex: 0 1 0%;
}

.condition-container {
  flex: 1 0 0%;
  display: flex;
  gap: 1rem;
  text-align: center;
}

.condition {
  flex: 1 0 0%;
}
</style>
