<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker';
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

// excercise - start ====
const excercise = ref<Excercise>(
  { id: 0, label: '플랫 벤치 프레스' },
);

const showExcerciseSelector = ref(false);

function changeExcercise(exr: Excercise) {
  excercise.value = exr;
  showExcerciseSelector.value = false;
}
// excercise - end ====
const records = ref<Records[]>([]);

const weight = ref(0);
const rep = ref(15);
const sec = ref(90);

// RecordReport - start ===
const showRecordReport = ref(false);
// RecordReport - end ===
// timer & stopWatch - start ====
const timeText = ref('');
const isRun = ref(false);

function setTimeText(ms: number) {
  timeText.value = msToTimeTextWithHour(ms);
}

function setIsRun(bool: boolean) {
  isRun.value = bool;
}

const totalStopWatch = new StopWatch(setTimeText, setIsRun);

const timerText = ref('');

const firstSetSec = 5; // 처음 시작 할 때 휴식시간
function setTimerText(ms: number) {
  const isFirstSet = records.value.length === 0;
  timerText.value = msToTimeText(secondsToMs(isFirstSet ? firstSetSec : sec.value) - ms);
}

const timer = new StopWatch(setTimerText, setIsRun);
// timer & stopWatch - end ====
// btn - start ====
function btnStart() {
  totalStopWatch.start();
  timer.start();
}

function btnRecord() {
  records.value.push({
    exrID: excercise.value.id,
    weight: weight.value,
    rep: rep.value,
    restSec: sec.value,
    totalSec: timer.getMs(),
  });
  timer.reset();
  timer.start();
}

function btnStop() {
  totalStopWatch.stop();
  timer.stop();
}

function btnReset() {
  showRecordReport.value = true;
}

function finish() {
  totalStopWatch.reset();
  timer.reset();
  records.value = [];
  showRecordReport.value = false;
}
// btn - end ====

const isWorkTime = computed(() => {
  const isFirstSet = records.value.length === 0;
  return timerText.value && isRun.value && ((secondsToMs(isFirstSet ? firstSetSec : sec.value) - timer.getMs()) < 0);
});

const message = computed(() => {
  if (!isWorkTime.value && records.value.length === 0 && isRun.value) {
    return '5초 후 시작!';
  }
  return isWorkTime.value ? '운동시작' : '휴식';
});

// nowExcercise computed - start ====
const nowExcerciseRep = computed(() => records.value.reduce((t, c) => (c.exrID === excercise.value.id ? t + c.rep : t), 0));
const nowExcerciseSet = computed(() => records.value.reduce((t, c) => (c.exrID === excercise.value.id ? t + 1 : t), 0));
// nowExcercise computed - end ====
</script>
<template>
  <div class="w-screen h-screen px-4 py-4 fixed">
    <div class="flex justify-between pt-3">
      <div>
        <p>
          {{ message }}
        </p>
        <p class="text-4xl">
          {{ timerText }}
        </p>
        <p class="text-2xl text-gray-500">
          {{ timeText }}
        </p>
      </div>
      <JCircle :is-red="isWorkTime" @click="showRecordReport = true">
        <p>
          <span class="text-4xl">{{ nowExcerciseSet }}</span>
          <span class="text-lg">/{{ records.length }}</span>
        </p>
        <p class="text-2xl">
          Set
        </p>
      </JCircle>
    </div>

    <div class="mt-5 border">
      <JMultiChart :data="records" :now-exr-id="excercise.id" />
    </div>

    <div class="pt-5 grid grid-cols-5">
      <div class="col-span-4" @click="showExcerciseSelector = true">
        <JInputText v-model="excercise.label" disabled />
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
        class="selected-color-red"
      />
      <JScrollPicker
        v-model="rep"
        label="횟수(회)"
        :options="selectorOptions.rep"
        class="selected-color-purple"
      />
      <JScrollPicker
        v-model="sec"
        label="휴삭(초)"
        :options="selectorOptions.sec"
        class="selected-color-green"
      />
    </div>

    <div class="grid gap-4 grid-cols-2 pt-5 my-3">
      <button v-if="isRun" class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="btnRecord()">
        기록
      </button>
      <button v-else class="text-slate-50 rounded-lg bg-green-500 h-14 text-xl" @click="btnStart()">
        시작
      </button>
      <button v-if="isRun" class="text-slate-50 rounded-lg bg-red-700 h-14 text-xl" @click="btnStop()">
        정지
      </button>
      <button v-else class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="btnReset()">
        종료
      </button>
    </div>
  </div>

  <Teleport to="body">
    <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showExcerciseSelector === true || showRecordReport === true">
      <template #body>
        <ExcerciseSelector v-if="showExcerciseSelector" v-model="excercise" :excercises="excercises" @cancel="showExcerciseSelector = false" @do-select="changeExcercise" />
        <RecordReport v-else-if="showRecordReport" :records="records" :excercises="excercises" :time-text="timeText" @cancel="showRecordReport = false" @submit="finish" />
      </template>
    </JBottomSheet>
  </Teleport>
</template>
