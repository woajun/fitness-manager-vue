<script setup lang="ts">
import { ref } from 'vue';
import StopWatch from '../../components/stopWatch';
import JChart from '../../components/JChart.vue';

const timeText = ref('');
const isRun = ref(false);
const stopWatch = new StopWatch(timeText, isRun);

type ChartData = {
  value: number,
};

const chartData = ref<ChartData[]>([]);

function start() {
  stopWatch.start();
}

function record() {
  let value = 0;
  const num = stopWatch.getMs();

  if (num < 10000) {
    value = Math.floor(num / 100) / 10;
  } else {
    value = Math.floor(num / 1000);
  }
  chartData.value.push({ value });
}

function stop() {
  stopWatch.stop();
}

function reset() {
  stopWatch.reset();
}
</script>
<template>
  <div>
    <div class="text-center">
      <span>운동시간 </span>
      <span class="text-3xl">
        {{ timeText }}
      </span>
    </div>
    <div class="text-center pt-3">
      <span>쉬는시간 </span>
      <span class="text-4xl">
        {{ timeText }}
      </span>
    </div>
    <div class="text-center pt-6">
      <p class="text-4xl font-semibold">
        플랫 벤치 프레스
      </p>
    </div>

    <div>
      {{ chartData }}
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
