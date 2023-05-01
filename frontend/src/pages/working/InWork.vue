<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import StopWatch from '../../components/stopWatch';
import JMultiChart from '../../components/JMultiChart.vue';
import {
  msToTimeText, msToTimeTextWithHour, secondsToMs,
} from '../../components/helper';
import selectorOptions from '../../data/selectorOptions';
import JBottomSheet from '../../components/JBottomSheet.vue';
import ExcerciseSelector from './ExcerciseSelector.vue';
import RecordReport from './RecordReport.vue';
import rawExcercises from '../../data/excercises';
import JCircle from '../../components/JCircle.vue';
import JInputText from '../../components/JInputText.vue';
import JScrollPicker from '../../components/JScrollPicker.vue';
import JButton from '../../components/JButton.vue';
import JBottomRightSnackbar from '../../components/JBottomRightSnackbar.vue';
import type { Exr, Set } from './interfaces';
import MyTimer from './timer/MyTimer.vue';

// excercise - start ====
const excercises = computed(() => rawExcercises.sort((a, b) => a.exrName[0].localeCompare(b.exrName[0])));
const excercise = ref<Exr>(excercises.value[0]);

const showExcerciseSelector = ref(false);

function changeExcercise(aExcercise: Exr) {
  excercise.value = aExcercise;
  showExcerciseSelector.value = false;
}
// excercise - end ====
// RecordReport - start ===
const records = ref<Set[]>([]);

const showRecordReport = ref(false);
const showSubmit = ref(false);
// RecordReport - end ===

const weight = ref(0);
const rep = ref(15);
const sec = ref(90);

// totalTimeText & stopWatch - start ====
const totalTimeText = ref('');
const isRun = ref(false);

const totalTimer = new StopWatch(
  (ms:number) => { totalTimeText.value = msToTimeTextWithHour(ms); },
  (bool: boolean) => { isRun.value = bool; },
);

const presentTimeText = ref('');

const firstSetSec = 0; // 처음 시작 할 때 휴식시간

function getNowRestTime() {
  const isFirstSet = records.value.length === 0;
  return secondsToMs(isFirstSet ? firstSetSec : sec.value);
}

const presentTimer = new StopWatch(
  (ms: number) => { presentTimeText.value = msToTimeText(getNowRestTime() - ms); },
  (bool: boolean) => { isRun.value = bool; },
);
// presentTimer & stopWatch - end ====
// submit - start ===
const startDate = ref<Date>(new Date());
function submit() {
  const dto = {
    memberId: 0,
    startTime: startDate.value,
    totalMs: totalTimer.getMs(),
    sets: records.value,
  };
  console.log(dto);
  axios.post('/record', dto);
}
// submit - end ===
// btn - start ====
function btnCircle() {
  showSubmit.value = false;
  showRecordReport.value = true;
}

function btnStart() {
  if (records.value.length === 0) {
    startDate.value = new Date();
  }
  totalTimer.start();
  presentTimer.start();
}

const isSnackbarShow = ref({ value: false });

// function btnRecord() {
//   records.value.push({
//     exrId: excercise.value.exrId,
//     weight: weight.value,
//     reps: rep.value,
//     restMs: sec.value,
//     totalMs: presentTimer.getMs(),
//     recordTime: new Date(),
//   });
//   presentTimer.reset();
//   presentTimer.start();
//   isSnackbarShow.value = { value: true };
// }

function cancelRecord() {
  const popped = records.value.pop();
  if (!popped) return;
  presentTimer.reset();
  presentTimer.setKeepDuration(popped.totalMs);
  presentTimer.start();
  isSnackbarShow.value = { value: false };
}

function btnStop() {
  totalTimer.stop();
  presentTimer.stop();
}

function btnReset() {
  showSubmit.value = true;
  showRecordReport.value = true;
}

function finish() {
  totalTimer.reset();
  presentTimer.reset();
  submit();
  records.value = [];
  showRecordReport.value = false;
}
// btn - end ====
// computed - start ====
const isWorking = computed(() => presentTimeText.value && isRun.value && ((getNowRestTime() - presentTimer.getMs()) < 0));
const message = computed(() => {
  let result = '휴식';
  if (!isWorking.value && records.value.length === 0 && isRun.value) {
    result = `${firstSetSec}초 후 시작!`;
  } if (!isRun.value) {
    result = '정지';
  } if (isWorking.value) {
    result = '운동시작';
  }
  return result;
});
const circleColor = computed(() => {
  if (!isRun.value) {
    return 'slate';
  }
  if (isWorking.value) {
    return 'red';
  }
  return 'gray';
});
const nowExcerciseRep = computed(() => records.value.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + c.reps : t), 0));
const nowExcerciseSet = computed(() => records.value.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + 1 : t), 0));
const circlePercent = computed(() => totalTimer.getMs() - getNowRestTime());
// computed - end ====
</script>
<template>
  <MyTimer :rest-sec="sec">
    <div class="flex-auto mt-5 border max-h-52 chart-center">
      <JMultiChart :data="records" :now-exr-id="excercise.exrId" />
    </div>

    <div class="flex-auto pt-5 grid grid-cols-5">
      <div class="col-span-4" @click="showExcerciseSelector = true">
        <JInputText v-model="excercise.exrName" readonly />
      </div>
      <div class=" text-gray-500 text-2xl relative break-keep">
        <div class="absolute bottom-0 right-0">
          {{ nowExcerciseRep }}<span class="text-xl">회</span>
        </div>
      </div>
    </div>

    <div class="flex-auto pt-5 grid grid-cols-3 text-center gap-1 text-lg text-gray-500">
      <JScrollPicker
        v-model="weight"
        label="중량(kg)"
        :options="selectorOptions.weight"
        color="red"
      />
      <JScrollPicker
        v-model="rep"
        label="횟수(회)"
        :options="selectorOptions.rep"
        color="purple"
      />
      <JScrollPicker
        v-model="sec"
        label="휴식(초)"
        :options="selectorOptions.sec"
        color="green"
      />
    </div>
  </MyTimer>

  <Teleport to="body">
    <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showExcerciseSelector === true || showRecordReport === true">
      <template #body>
        <ExcerciseSelector v-if="showExcerciseSelector" v-model="excercise" :excercises="excercises" @cancel="showExcerciseSelector = false" @do-select="changeExcercise" />
        <RecordReport v-else-if="showRecordReport" :records="records" :excercises="excercises" :time-text="totalTimeText" :show-submit="showSubmit" @cancel="showRecordReport = false" @submit="finish" />
      </template>
    </JBottomSheet>
  </Teleport>

  <Teleport to="body">
    <JBottomRightSnackbar v-model="isSnackbarShow" label="기록취소" @click="cancelRecord" />
  </Teleport>
</template>
<style>
.chart-center {
  text-align: -webkit-center;
}
</style>
