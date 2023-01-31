<script setup lang="ts">
import { ref } from 'vue';
import StopWatch from '../../components/stopWatch';
import JChart from '../../components/JChart.vue';
import { msToTimeText, secondsToMs } from '../../components/helper';

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
const restSeconds = ref(90);
const chartData = ref<ChartData[]>([]);

function setTimerText(ms: number) {
  timerText.value = msToTimeText(secondsToMs(restSeconds.value) - ms);
  if (chartData.value.length > 1) {
    chartData.value[chartData.value.length - 1] = { value: ms / 1000 };
  }
}

const timer = new StopWatch(setTimerText, setIsRun);

type ChartData = {
  value: number,
};

function start() {
  totalStopWatch.start();
  timer.start();
}

function record() {
  chartData.value.push({ value: timer.getMs() / 1000 });
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
</script>
<template>
  <div>
    <div class="text-center">
      <span>운동 시간 </span>
      <span class="text-3xl">
        {{ timeText }}
      </span>
    </div>
    <div class="text-center pt-3">
      <span>쉬는 시간 </span>
      <span class="text-4xl">
        {{ timerText }}
      </span>
    </div>
    <div class="text-center pt-6">
      <p class="text-4xl font-semibold">
        플랫 벤치 프레스
      </p>
    </div>

    <div>
      <JChart :data="chartData" />
    </div>

    <div class="text-center text-4xl">
      <span class="font-semibold">60kg</span>
      <span class="font-semibold"> 15rep</span>
    </div>
    <div class="text-center text-4xl pt-5">
      <span class="font-semibold">90 sec</span>
    </div>
    <div class="grid gap-4 grid-cols-2 pt-5 my-3">
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-14" @click="isRun ? record() : start()">
        {{ isRun ? '기록' : '시작' }}
      </button>
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-14" @click="isRun ? stop() : reset()">
        {{ isRun ? '정지' : '운동종료' }}
      </button>
    </div>
    <div class="grid pt-10">
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-20">
        다음운동
      </button>
    </div>
  </div>
</template>
