<script setup lang="ts">
import { ref } from 'vue';
import StopWatch from '../../components/stopWatch';
import JChart from '../../components/JChart.vue';
import JModal from '../../components/JModal.vue';
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
  showModal.value = true;
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

</script>
<template>
  <div class="h-screen px-4 py-4 background" :class="secondsToMs(restSeconds) - timer.getMs() < 0 ? 'red-mode' : ''">
    <div class="text-center pt-3">
      <p class="text-4xl font-semibold">
        {{ secondsToMs(restSeconds) - timer.getMs() < 0 ? 'Let\'s work out!' : 'Take a breath!' }}
      </p>
    </div>
    <div class="text-center pt-3">
      <span class="text-5xl">
        {{ timerText }}
      </span>
    </div>
    <div class="text-center">
      <span class="text-3xl font-semibold text-gray-500">
        ( {{ timeText }} )
      </span>
    </div>

    <div class="pt-5">
      <JChart :data="chartData" />
    </div>

    <div class="text-center text-3xl pt-3">
      <span class="font-semibold">스쿼트 </span>
    </div>
    <div class="text-center text-3xl pt-5">
      <span class="font-semibold">60kg </span>
      <span class="font-semibold"> 15rep </span>
      <span class="font-semibold"> 3sec</span>
    </div>
    <div class="grid gap-4 grid-cols-2 pt-5 my-3">
      <button class="button font-semibold rounded-lg bg-slate-700 h-14" @click="isRun ? record() : start()">
        {{ isRun ? '기록' : '시작' }}
      </button>
      <button class="button font-semibold rounded-lg bg-slate-700 h-14" @click="isRun ? stop() : reset()">
        {{ isRun ? '정지' : '운동종료' }}
      </button>
    </div>
    <div class="grid pt-5">
      <button class="button font-semibold rounded-lg bg-slate-700 h-14">
        다음운동
      </button>
    </div>

    <Teleport to="body">
      <JModal :show="showModal">
        <template #header>
          <h3>수행결과</h3>
        </template>
        <template #body>
          중량 60 kg
        </template>
        <template #footer>
          <button @click="showModal = false">
            확인
          </button>
        </template>
      </JModal>
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
  background-color: rgb(153, 27, 27);
  opacity: 0;
  transition: opacity 0.2s linear;
}
.red-mode.background::before {
  opacity: 1;
}

</style>
