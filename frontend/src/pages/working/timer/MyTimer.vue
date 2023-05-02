<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { msToTimeText, msToTimeTextWithHour } from '@/components/helper';
import JButton from '@/components/JButton.vue';

const props = defineProps<{
  restSec: number;
}>();

const emits = defineEmits<{
  (e: 'start'): void
  (e: 'record', ms: number): void
  (e: 'finish', ms: number): void
}>();

const totalTime = ref(0);
const currentTime = ref(0);
const status = ref<'READY' | 'RUN' | 'STOP'>('READY');

let intervalId = 0;

watch(status, (newStatus) => {
  clearInterval(intervalId);
  if (newStatus === 'RUN') {
    intervalId = setInterval(() => {
      currentTime.value += 100;
      totalTime.value += 100;
    }, 100);
  }
});

function handleRun() {
  if (status.value === 'READY') emits('start');
  status.value = 'RUN';
}

function handlePause() {
  status.value = 'STOP';
}

function handleReset() {
  emits('finish', totalTime.value);
  status.value = 'READY';
  currentTime.value = 0;
  totalTime.value = 0;
}

function handleRecord() {
  emits('record', currentTime.value);
  currentTime.value = 0;
}

const runTime = computed(() => (props.restSec * 1000) - currentTime.value);

const BLUE = ' rgb(51 65 85) ';
const GREEN = ' rgb(34 197 94) ';

const circleBackground = computed(() => {
  let result;
  if (status.value === 'READY') {
    result = GREEN;
  } else if (runTime.value < 0) {
    result = '';
    if (status.value === 'STOP') {
      result = BLUE;
    }
  } else {
    const percent = (currentTime.value / (props.restSec * 1000)) * 100;
    if (percent > 50) {
      result = `linear-gradient(to bottom, ${BLUE} ${percent}%, ${GREEN} 50%)`;
    } else {
      result = `linear-gradient(to top, ${GREEN} ${100 - percent}%, ${BLUE} 50%)`;
    }
  }

  return {
    background: result,
  };
});
</script>
<template>
  <div class="flex-auto flex flex-col">
    <div class="flex-auto flex justify-between">
      <div>
        <p class="text-3xl">
          {{ (status === 'RUN' && runTime > 0) ? 'REST' : status }}
        </p>
        <p class="text-4xl">
          {{ msToTimeText(runTime) }}
        </p>
        <p class="text-3xl text-gray-500">
          {{ msToTimeTextWithHour(totalTime) }}
        </p>
      </div>
      <div class="w-28 h-28 text-center rounded-full text-white pt-3 bg-red-600 border-red-700" :style="circleBackground">
        <slot name="circle" />
      </div>
    </div>

    <slot />

    <div class="flex-auto grid gap-4 grid-cols-2 pt-5 h-20">
      <template v-if="status !== 'RUN'">
        <JButton
          label="run"
          color="green"
          @click="handleRun"
        />
        <JButton
          label="finish"
          :disabled="totalTime === 0"
          @click="handleReset"
        />
      </template>
      <template v-else>
        <JButton
          label="record"
          :disabled="runTime > 0"
          @click="handleRecord"
        />
        <JButton
          label="pause"
          color="red"
          @click="handlePause"
        />
      </template>
    </div>
  </div>
</template>
