<script setup lang="ts">
import { ref } from 'vue';
import StopWatch from '../../components/stopWatch';

const timeText = ref('');
const stopWatch = new StopWatch(timeText);

</script>
<template>
  <div>
    <div class="text-center">
      <span>Total </span>
      <span class="text-3xl">
        {{ timeText }}
      </span>
    </div>
    <div class="text-center pt-3">
      <span>Now </span>
      <span class="text-4xl">
        {{ timeText }}
      </span>
    </div>
    <div class="text-center pt-3">
      <p class="text-4xl font-semibold">
        플랫 벤치 프레스
      </p>
    </div>

    <div class="text-center py-20 my-10 bg-slate-400">
      GRAPH
    </div>

    <div class="text-center text-4xl">
      <span class="font-semibold">60kg</span>
      <span class="font-semibold"> 15rep</span>
    </div>
    <div class="text-center text-4xl pt-5">
      <span class="font-semibold">90 sec</span>
    </div>
    <div class="grid gap-4 grid-cols-2 py-5 mt-3">
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-12" @click="stopWatch.start">
        시작
      </button>
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-12" @click="stopWatch.stop">
        일시정지
      </button>
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-12">
        이전운동
      </button>
      <button class="font-semibold rounded-lg bg-fuchsia-500 h-12">
        다음운동
      </button>
    </div>
  </div>
</template>
