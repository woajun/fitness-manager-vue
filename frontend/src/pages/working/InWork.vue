<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker';
import StopWatch from '../../components/stopWatch';
// import JChart from '../../components/JChart.vue';
import JMultiChart from '../../components/JMultiChart.vue';
import JBottomSheet from '../../components/JBottomSheet.vue';
import { msToTimeText, msToTimeTextWithHour, secondsToMs } from '../../components/helper';
import JScrollPickerVue from '../../components/JScrollPicker.vue';

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
  <div class="w-screen h-screen px-4 py-4 background fixed" :class="{ active: isWorkTime }">
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
        <div class="numberCircle bg-neutral-500 text-white">
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
      <JMultiChart data-key="rep" :data="records" :font-color="isWorkTime ? 'rgb(248 250 252)' : ''" unit="회" />
      <!-- <JChart data-key="totalSec" :data="records" :font-color="isWorkTime ? 'rgb(248 250 252)' : ''" unit="초" /> -->
    </div>

    <div class="pt-4 mx-4 flex justify-between">
      <div>
        <span class="">윗몸일으키기</span>
      </div>
      <div class="text-gray-500 text-2xl">
        (x
        {{ records.reduce((t, c) => t + c.rep, 0) }}
        회)
      </div>
    </div>
    <div class="pt-5 grid grid-cols-3 text-center gap-1">
      <div>
        <label class="text-xl text-gray-500">
          중량(kg)<br />
          <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-3">
            <VueScrollPicker
              v-model="weight"
              :options="[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
              class="selected-color-red"
            />
          </div>
        </label>
      </div>
      <div>
        <label class="text-xl text-gray-500">
          횟수(회)<br />
          <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-3">
            <VueScrollPicker
              v-model="rep"
              :options="[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
              class="selected-color-purple"
            />
          </div>
        </label>
      </div>
      <div>
        <label class="text-xl text-gray-500">
          휴식(초)<br />
          <div class="border-2 rounded-lg text-3xl vertical-center max-h-24 truncate mt-3">
            <VueScrollPicker
              v-model="sec"
              :options="[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
              class="selected-color-green"
            />
          </div>
        </label>
      </div>
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
.background {
  position: relative;
  z-index: 0;
}
.background::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.2s linear;
  --tw-bg-opacity: 1;
  background-color: rgb(38 38 38 / var(--tw-bg-opacity));
}
.active.background::before {
  opacity: 1;
}
.active {
  --tw-text-opacity: 1;
  color: rgb(248 250 252 / var(--tw-text-opacity));
}

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
</style>
