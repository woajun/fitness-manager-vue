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
  <div class="timer">
    <div class="timer-container">
      <div class="times fs-18">
        <div>
          {{ (status === 'RUN' && runTime > 0) ? 'REST' : status }}
        </div>
        <div class="fs-22">
          {{ msToTimeText(runTime) }}
        </div>
        <div class="total">
          {{ msToTimeTextWithHour(totalTime) }}
        </div>
      </div>
      <div class="circle" :style="circleBackground">
        <slot name="circle" />
      </div>
    </div>

    <slot />

    <div class="btn-container">
      <template v-if="status !== 'RUN'">
        <JButton
          class="btns"
          label="run"
          color="green"
          @click="handleRun"
        />
        <JButton
          class="btns"
          label="finish"
          :disabled="totalTime === 0"
          @click="handleReset"
        />
      </template>
      <template v-else>
        <JButton
          class="btns"
          label="record"
          :disabled="runTime > 0"
          @click="handleRecord"
        />
        <JButton
          class="btns"
          label="pause"
          color="red"
          @click="handlePause"
        />
      </template>
    </div>
  </div>
</template>
<style scoped>
.timer {
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
}

.timer-container {
  flex: 1 0 0%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.times {
  flex: 1 1 auto;
  line-height: 2.25rem;
  display: flex;
  flex-direction: column;
}

.total {
  color: rgb(107 114 128);
}

.circle {
  flex: 0 1 auto;
  color: rgb(255 255 255);
  text-align: center;
  padding-top: 0.75rem;
  background-color: rgb(220 38 38);
  border-radius: 9999px;
  width: 7rem;
  height: 7rem;
}

.btn-container {
  flex: 0 0 0%;
  display: flex;
  gap: 0.5rem
}

.btns {
  flex: 1 0 0%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

</style>
