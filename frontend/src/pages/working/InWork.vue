<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker';
import StopWatch from '../../components/stopWatch';
import JChart from '../../components/JChart.vue';
import JBottomSheet from '../../components/JBottomSheet.vue';
import { msToTimeText, secondsToMs } from '../../components/helper';

type ChartData = {
  seconds: number,
};

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
const restSeconds = ref(3);
const chartData = ref<ChartData[]>([]);

function setTimerText(ms: number) {
  timerText.value = msToTimeText(secondsToMs(restSeconds.value) - ms);
  if (chartData.value.length > 1) {
    chartData.value[chartData.value.length - 1] = { seconds: ms / 1000 };
  }
}

const timer = new StopWatch(setTimerText, setIsRun);

function start() {
  totalStopWatch.start();
  timer.start();
}

const showModal = ref(false);

function record() {
  chartData.value.push({ seconds: timer.getMs() / 1000 });
  timer.reset();
  timer.start();
}

function stop() {
  totalStopWatch.stop();
  timer.stop();
}

function reset() {
  totalStopWatch.reset();
  timer.reset();
  chartData.value = [];
}

const isActive = computed(() => timerText.value && isRun.value && ((secondsToMs(restSeconds.value) - timer.getMs()) < 0));

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
            <span class="text-4xl">3</span>
            <span>set</span>
          </div>
          <span class="text-lg">1256</span>
          <span class="text-sm">칼로리</span>
        </div>
      </div>
    </div>

    <div class="mt-5 border">
      <JChart :data="chartData" :font-color="isActive ? 'rgb(248 250 252)' : ''" />
    </div>

    <div class="pt-4 mx-4 flex justify-between">
      <div>
        <span class="">스쿼트 </span>
      </div>
      <div>
        <span class="rounded-lg  bg-neutral-500 text-white text-xl px-4 py-2">
          52회
        </span>
      </div>
    </div>
    <div class="pt-5 flex text-center">
      <div class="flex-1" @click="showModal = true">
        <label class="text-xl text-gray-500">다음 중량</label>
        <span class="">60kg</span>
      </div>
      <div class="flex-1">
        <label class="text-xl text-gray-500">목표 횟수</label>
        <span class="">15rep</span>
      </div>
      <div class="flex-1">
        <label class="text-xl text-gray-500">휴식 시간</label>
        <span class="">3sec</span>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-2 pt-5 my-3">
      <button v-if="isRun" class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="record()">
        기록
      </button>
      <button v-else class="text-slate-50 rounded-lg bg-green-500 h-14 text-xl" @click="start()">
        시작
      </button>
      <button v-if="isRun" class="text-slate-50 rounded-lg bg-red-700 h-14 text-xl" @click="stop()">
        정지
      </button>
      <button v-else class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="reset()">
        종료
      </button>
    </div>

    <Teleport to="body">
      <JBottomSheet class="text-3xl font-semibold" :show="showModal">
        <template #body>
          <div class="flex text-center">
            <div class="flex-1 vertical-center">
              중량
            </div>
            <div class="flex-1 text-4xl vertical-center max-h-24 truncate">
              <VueScrollPicker :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" />
            </div>
            <div class="flex-1 vertical-center">
              kg
            </div>
          </div>
        </template>
        <template #footer>
          <div class="grid">
            <button class="text-slate-50 rounded-lg bg-sky-500 h-14 text-xl" @click="showModal = false">
              선택완료
            </button>
          </div>
        </template>
      </JBottomSheet>
    </Teleport>
  </div>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
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
