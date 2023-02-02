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

// excercise - start ====
// excercise - end ====
type Records = {
  weight: number,
  rep: number,
  restSec: number,
  totalSec: number,
};
const records = ref<Records[]>([]);

const weight = ref(0);
const rep = ref(15);
const sec = ref(90);

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
    weight: weight.value,
    rep: rep.value,
    restSec: sec.value,
    totalSec: timer.getMs() / 1000,
  });
  timer.reset();
  timer.start();
}

function btnStop() {
  totalStopWatch.stop();
  timer.stop();
}

function btnReset() {
  totalStopWatch.reset();
  timer.reset();
  records.value = [];
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
</script>
<template>
  <div class="w-screen h-screen px-4 py-4 fixed">
    <div class="flex justify-between pt-3">
      <div>
        <div class="">
          {{ message }}
        </div>
        <div class="">
          <span class="text-4xl">
            {{ timerText }}
          </span>
        </div>
        <div class="">
          <span class="text-2xl  text-gray-500">
            {{ timeText }}
          </span>
        </div>
      </div>
      <div>
        <div class="numberCircle bg-neutral-500 text-white" :class="{ 'bg-red-600': isWorkTime, 'border-red-700': isWorkTime }">
          <div class="pt-3">
            <span class="text-4xl">{{ records.length }}</span>
            <span>set</span>
          </div>
          <span class="text-lg">1256</span>
          <span class="text-sm">칼로리</span>
        </div>
      </div>
    </div>

    <div class="mt-5 border">
      <JMultiChart data-key="rep" :data="records" />
    </div>

    <div class="pt-4 flex height60px">
      <div class="basis-3/4 border-2 rounded-lg text-2xl py-1 pl-2  overflow-hidden break-all">
        플랫 벤치프레스
      </div>
      <div class="basis-1/4 text-gray-500 text-2xl ml-2 text-right relative break-keep">
        <div class="absolute bottom-0 right-0">
          {{ records.reduce((t, c) => t + c.rep, 0) }}<span class="text-xl">회</span>
        </div>
      </div>
    </div>
    <div class="pt-5 grid grid-cols-3 text-center gap-1 text-lg text-gray-500">
      <label>
        중량(kg)<br />
        <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-1">
          <VueScrollPicker
            v-model="weight"
            :options="selectorOptions.weight"
            class="selected-color-red"
          />
        </div>
      </label>
      <label>
        횟수(회)<br />
        <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-1">
          <VueScrollPicker
            v-model="rep"
            class="selected-color-purple"
            :options="selectorOptions.rep"
          />
        </div>
      </label>
      <label>
        휴식(초)<br />
        <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-1">
          <VueScrollPicker
            v-model="sec"
            :options="selectorOptions.sec"
            class="selected-color-green"
          />
        </div>
      </label>
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
</template>
<style>
.numberCircle {
    border-radius: 50%;
    width: 7rem;
    height: 100%;
    border: 2px solid #666;
    text-align: center;
}

.vertical-center {
  justify-content: center;
  align-items: center;
  display: flex;
}
.height60px {
  height: 60px;
}
</style>
<style src="vue-scroll-picker/lib/style.css"></style>
<style>
.selected-color-red .vue-scroll-picker-item-selected {
  color: rgb(153 27 27 / var(--tw-text-opacity));
}
.selected-color-purple .vue-scroll-picker-item-selected {
  color: rgb(91 33 182 / var(--tw-text-opacity));
}
.selected-color-green .vue-scroll-picker-item-selected {
  color: rgb(22 101 52 / var(--tw-text-opacity));
}
</style>
