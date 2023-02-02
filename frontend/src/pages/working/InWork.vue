<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import { computed, ref } from 'vue';
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

// BottomSheet - start =====
type BottomSheet = 'weight' | 'rep' | 'sec' | 'record';
const btmShtState = ref<BottomSheet>('weight');
const showBtmSht = ref(false);

function showBtmShtWeight() {
  btmShtState.value = 'weight';
  showBtmSht.value = true;
}
function showBtmShtRep() {
  btmShtState.value = 'rep';
  showBtmSht.value = true;
}
function showBtmShtSec() {
  btmShtState.value = 'sec';
  showBtmSht.value = true;
}
// BottomSheet - end ====
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
  if (!isWorkTime.value && records.value.length === 0 && isRun.value && !showBtmSht.value) {
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
      <div @click="showBtmShtWeight">
        <label class="text-xl text-gray-500">
          중량<br />
          <input class="border-2 rounded-lg text-3xl text-center h-14 mt-1 text-red-800 w-full" :value="`${weight}kg`">
        </label>
      </div>
      <div @click="showBtmShtRep">
        <label class="text-xl text-gray-500">
          횟수<br />
          <input class="border-2 rounded-lg text-3xl text-center h-14 mt-1 text-violet-800 w-full" :value="`${rep}rep`" size="3">
        </label>
      </div>
      <div @click="showBtmShtSec">
        <label class="text-xl text-gray-500">
          휴식 시간<br />
          <input class="border-2 rounded-lg text-3xl text-center h-14 mt-1 text-green-800 w-full" :value="`${sec}sec`" size="3">
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

    <Teleport to="body">
      <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showBtmSht">
        <template #body>
          <JScrollPickerVue v-if="btmShtState === 'weight'" v-model="weight" :options="500" label="중량" unit="kg" selected-color="red" />
          <JScrollPickerVue v-else-if="btmShtState === 'rep'" v-model="rep" :options="500" label="횟수" unit="rep" selected-color="purple" />
          <JScrollPickerVue v-else-if="btmShtState === 'sec'" v-model="sec" :options="1000" label="시간" unit="sec" selected-color="green" />
        </template>
        <template #footer>
          <div class="grid">
            <button class="text-slate-50 rounded-lg bg-sky-500 h-14 text-xl" @click="showBtmSht = false">
              선택완료
            </button>
          </div>
        </template>
      </JBottomSheet>
    </Teleport>
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
