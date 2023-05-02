<!-- eslint-disable vue/max-len -->
<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import JMultiChart from '../../components/JMultiChart.vue';
import selectorOptions from '../../data/selectorOptions';
import JBottomSheet from '../../components/JBottomSheet.vue';
import ExcerciseSelector from './ExcerciseSelector.vue';
import RecordReport from './RecordReport.vue';
import rawExcercises from '../../data/excercises';
import JInputText from '../../components/JInputText.vue';
import JScrollPicker from '../../components/JScrollPicker.vue';
import JBottomRightSnackbar from '../../components/JBottomRightSnackbar.vue';
import type { Exr, Set } from './interfaces';
import MyTimer from './timer/MyTimer.vue';

// excercise - start ====
const excercises = computed(() => rawExcercises.sort((a, b) => a.exrName[0].localeCompare(b.exrName[0])));
const excercise = ref<Exr>(excercises.value[0]);

const showExcerciseSelector = ref(false);

function changeExcercise(aExcercise: Exr) {
  excercise.value = aExcercise;
  showExcerciseSelector.value = false;
}
// excercise - end ====
// RecordReport - start ===
const records = ref<Set[]>([]);

const showRecordReport = ref(false);
const showSubmit = ref(false);
// RecordReport - end ===

const weight = ref(0);
const rep = ref(15);
const sec = ref(90);

// totalTimeText & stopWatch - start ====
const totalTimeText = ref('');

const startDate = ref<Date>(new Date());
function submit() {
  const dto = {
    memberId: 0,
    startTime: startDate.value,
    totalMs: 10,
    sets: records.value,
  };
  axios.post('/record', dto);
}

const isSnackbarShow = ref({ value: false });

function record(ms: number) {
  records.value.push({
    exrId: excercise.value.exrId,
    weight: weight.value,
    reps: rep.value,
    restMs: sec.value,
    totalMs: ms,
    recordTime: new Date(),
  });
  isSnackbarShow.value = { value: true };
}

function cancelRecord() {
  const popped = records.value.pop();
  if (!popped) return;
  isSnackbarShow.value = { value: false };
}

function finish() {
  submit();
  records.value = [];
  showRecordReport.value = false;
}

const nowExcerciseRep = computed(() => records.value.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + c.reps : t), 0));
const nowExcerciseSet = computed(() => records.value.reduce((t, c) => (c.exrId === excercise.value.exrId ? t + 1 : t), 0));
</script>
<template>
  <MyTimer :rest-sec="sec" @record="record" @finish="finish">
    <template #circle>
      <p
        @click="() => {
          showSubmit = false;
          showRecordReport = true;
        }"
      >
        <span class="text-4xl">{{ nowExcerciseSet }}</span>
        <span class="text-lg">/{{ records.length }}</span>
      </p>
      <p class="text-2xl">
        Set
      </p>
    </template>
    <div class="flex-auto mt-5 border max-h-52 chart-center">
      <JMultiChart :data="records" :now-exr-id="excercise.exrId" />
    </div>

    <div class="flex-auto pt-5 grid grid-cols-5">
      <div class="col-span-4" @click="showExcerciseSelector = true">
        <JInputText v-model="excercise.exrName" readonly />
      </div>
      <div class=" text-gray-500 text-2xl relative break-keep">
        <div class="absolute bottom-0 right-0">
          {{ nowExcerciseRep }}<span class="text-xl">rep</span>
        </div>
      </div>
    </div>

    <div class="flex-auto pt-5 grid grid-cols-3 text-center gap-1 text-lg text-gray-500">
      <JScrollPicker
        v-model="weight"
        label="kg"
        :options="selectorOptions.weight"
        color="red"
      />
      <JScrollPicker
        v-model="rep"
        label="rep"
        :options="selectorOptions.rep"
        color="purple"
      />
      <JScrollPicker
        v-model="sec"
        label="sec"
        :options="selectorOptions.sec"
        color="green"
      />
    </div>
  </MyTimer>

  <Teleport to="body">
    <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showExcerciseSelector === true || showRecordReport === true">
      <template #body>
        <ExcerciseSelector
          v-if="showExcerciseSelector"
          v-model="excercise"
          :excercises="excercises"
          @cancel="showExcerciseSelector = false"
          @do-select="changeExcercise"
        />
        <RecordReport
          v-else-if="showRecordReport"
          :records="records"
          :excercises="excercises"
          :time-text="totalTimeText"
          :show-submit="showSubmit"
          @cancel="showRecordReport = false"
          @submit="finish"
        />
      </template>
    </JBottomSheet>
  </Teleport>

  <Teleport to="body">
    <JBottomRightSnackbar v-model="isSnackbarShow" label="기록취소" @click="cancelRecord" />
  </Teleport>
</template>
<style>
.chart-center {
  text-align: -webkit-center;
}
</style>
