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
import type { Excercise, Records } from '@/interfaces';
import excercises from '../../data/excercises';
import JCircle from '../../components/JCircle.vue';
import JInputText from '../../components/JInputText.vue';
import JScrollPicker from '../../components/JScrollPicker.vue';
import JButton from '../../components/JButton.vue';
import JBottomRightSnackbar from '../../components/JBottomRightSnackbar.vue';

// excercise - start ====
const excercise = ref<Excercise>(excercises[0]);

const showExcerciseSelector = ref(false);

function changeExcercise(aExcercise: Excercise) {
  excercise.value = aExcercise;
  showExcerciseSelector.value = false;
}
// excercise - end ====
// RecordReport - start ===
const records = ref<Records[]>([]);

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

const firstSetSec = 5; // 처음 시작 할 때 휴식시간

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
    memberID: 0,
    startDate: startDate.value,
    totalTime: totalTimer.getMs(),
    sets: records.value,
  };
  console.log(dto);
  axios.post('/record', {hello: 'hi'});
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

function btnRecord() {
  records.value.push({
    exrID: excercise.value.id,
    weight: weight.value,
    rep: rep.value,
    restSec: sec.value,
    totalSec: presentTimer.getMs(),
    date: new Date(),
  });
  presentTimer.reset();
  presentTimer.start();
  isSnackbarShow.value = { value: true };
}

function cancelRecord() {
  const popped = records.value.pop();
  if (!popped) return;
  presentTimer.reset();
  presentTimer.setKeepDuration(popped.totalSec);
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
const nowExcerciseRep = computed(() => records.value.reduce((t, c) => (c.exrID === excercise.value.id ? t + c.rep : t), 0));
const nowExcerciseSet = computed(() => records.value.reduce((t, c) => (c.exrID === excercise.value.id ? t + 1 : t), 0));
// computed - end ====
</script>
<template>
  <div class="w-screen h-screen px-4 py-4 fixed">
    <div class="flex justify-between pt-3">
      <div>
        <p>
          {{ message }}
        </p>
        <p class="text-4xl">
          {{ presentTimeText }}
        </p>
        <p class="text-2xl text-gray-500">
          {{ totalTimeText }}
        </p>
      </div>
      <JCircle :is-red="isWorking" :color="circleColor" @click="btnCircle">
        <p>
          <span class="text-4xl">{{ nowExcerciseSet }}</span>
          <span class="text-lg">/{{ records.length }}</span>
        </p>
        <p class="text-2xl">
          Set
        </p>
      </JCircle>
    </div>

    <div class="mt-5 border max-h-52 chart-center">
      <JMultiChart :data="records" :now-exr-id="excercise.id" />
    </div>

    <div class="pt-5 grid grid-cols-5">
      <div class="col-span-4" @click="showExcerciseSelector = true">
        <JInputText v-model="excercise.label" readonly />
      </div>
      <div class=" text-gray-500 text-2xl relative break-keep">
        <div class="absolute bottom-0 right-0">
          {{ nowExcerciseRep }}<span class="text-xl">회</span>
        </div>
      </div>
    </div>
    <div class="pt-5 grid grid-cols-3 text-center gap-1 text-lg text-gray-500">
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

    <div class="grid gap-4 grid-cols-2 pt-5 my-3 h-20">
      <JButton v-if="isRun" label="기록" :disabled="!isWorking" @click="btnRecord()" />
      <JButton v-else label="시작" color="green" @click="btnStart()" />
      <JButton v-if="isRun" label="정지" color="red" @click="btnStop()" />
      <JButton v-else label="종료" @click="btnReset()" />
    </div>
  </div>

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
