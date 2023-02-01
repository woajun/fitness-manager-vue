<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import StopWatch from '../../components/stopWatch';
import JChart from '../../components/JChart.vue';
import JBottomSheet from '../../components/JBottomSheet.vue';
import { msToTimeText, secondsToMs } from '../../components/helper';
import JScrollPickerVue from '../../components/JScrollPicker.vue';

type Records = {
  weight: number,
  rep: number,
  restSec: number,
  totalSec: number,
};
const records = ref<Records[]>([]);

const expectWeight = ref(60);
const expectRep = ref(15);
const expectSec = ref(30);

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
function showBtmShtRecord() {
  btmShtState.value = 'record';
  showBtmSht.value = true;
}
// BottomSheet - end ====
// for Record - start ====
const recordRequest = reactive({
  weight: 0,
  rep: 0,
  restSec: 0,
  totalSec: 0,
});

function initRecordObj(w: number, rep: number, rs: number, ts: number) {
  recordRequest.weight = w;
  recordRequest.rep = rep;
  recordRequest.restSec = rs;
  recordRequest.totalSec = ts;
}

function doRecord() {
  records.value.push({ ...recordRequest, totalSec: recordRequest.totalSec / 1000 });
  showBtmSht.value = false;
}
// for Record - end ====
// timer & stopWatch - start ====
const timeText = ref('');
const isRun = ref(false);

function setTimeText(ms: number) {
  timeText.value = msToTimeText(ms);
}

function setIsRun(bool: boolean) {
  isRun.value = bool;
}

const totalStopWatch = new StopWatch(setTimeText, setIsRun);

const timerText = ref('');

function setTimerText(ms: number) {
  timerText.value = msToTimeText(secondsToMs(expectSec.value) - ms);
  if (records.value.length > 1) {
    records.value[records.value.length - 1] = { ...records.value[records.value.length - 1], totalSec: ms / 1000 };
  }
}

const timer = new StopWatch(setTimerText, setIsRun);
// timer & stopWatch - end ====
// btn - start ====
function btnStart() {
  totalStopWatch.start();
  timer.start();
}

function btnRecord() {
  initRecordObj(expectWeight.value, expectRep.value, expectSec.value, timer.getMs());
  timer.reset();
  timer.start();
  showBtmShtRecord();
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

const isActive = computed(() => timerText.value && isRun.value && ((secondsToMs(expectSec.value) - timer.getMs()) < 0));

</script>
<template>
  <div class="h-screen px-4 py-4 background fixed" :class="{ active: isActive }">
    <div class="flex justify-between pt-3">
      <div>
        <div class="">
          <p class="">
            {{ isActive ? '운동시작' : '휴식' }}
          </p>
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
      <JChart data-key="rep" :data="records" :font-color="isActive ? 'rgb(248 250 252)' : ''" />
    </div>

    <div class="pt-4 mx-4 flex justify-between">
      <div>
        <span class="">스쿼트 </span>
      </div>
      <div class="rounded-lg  bg-neutral-500 text-white text-xl px-4 py-2">
        <span>
          {{ records.reduce((t, c) => t + c.rep, 0) }}
          회
        </span>
      </div>
    </div>
    <div class="pt-5 flex text-center">
      <div class="flex-1" @click="showBtmShtWeight">
        <label class="text-xl text-gray-500">도전 중량</label><br />
        <span>{{ expectWeight }}kg</span>
      </div>
      <div class="flex-1" @click="showBtmShtRep">
        <label class="text-xl text-gray-500">목표 횟수</label>
        <span class="">{{ expectRep }}rep</span>
      </div>
      <div class="flex-1" @click="showBtmShtSec">
        <label class="text-xl text-gray-500">휴식 시간</label>
        <span class="">{{ expectSec }}sec</span>
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
          <JScrollPickerVue v-if="btmShtState === 'weight'" v-model="expectWeight" :options="500" label="중량" unit="kg" />
          <JScrollPickerVue v-else-if="btmShtState === 'rep'" v-model="expectRep" :options="500" label="횟수" unit="rep" />
          <JScrollPickerVue v-else-if="btmShtState === 'sec'" v-model="expectSec" :options="1000" label="시간" unit="sec" />
          <div v-else-if="btmShtState === 'record'" class="text-2xl gap-3">
            <JScrollPickerVue v-model="recordRequest.weight" class="py-5 border-b" :options="500" label="수행중량" unit="kg" />
            <JScrollPickerVue v-model="recordRequest.rep" class="py-5 border-b" :options="500" label="수행횟수" unit="rep" />
            <JScrollPickerVue v-model="recordRequest.restSec" class="py-5" :options="1000" label="휴식시간" unit="sec" />
          </div>
        </template>
        <template #footer>
          <div v-if="btmShtState === 'record'" class="grid">
            <button class="text-slate-50 rounded-lg bg-sky-500 h-14 text-xl" @click="doRecord">
              선택완료
            </button>
          </div>
          <div v-else class="grid">
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
