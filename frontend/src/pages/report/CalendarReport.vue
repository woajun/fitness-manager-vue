<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { msToTimeTextWithHour, sliceIntoChunks } from '@/components/helper';
import JBottomSheet from '@/components/JBottomSheet.vue';
import JButton from '@/components/JButton.vue';
import JInputText from '@/components/JInputText.vue';
import JSvg from '@/components/JSvg.vue';
import excercises from '@/data/excercises';
import type { Exr, Work, WorkSortedExr } from './interfaces';
import ExcerciseSelector from '@/pages/working/ExcerciseSelector.vue';
import CalendarCell, { type CalendarCellProps } from './CalendarCell.vue';
import DateReport from './DateReport.vue';
import { convertExr } from './workConverter';
// selectedExr - start ====
const selectedExr = ref<Exr>({exrId: -1, exrName: '전체'});

const showExcerciseSelector = ref(false);

function changeExcercise(aExcercise: Exr) {
  selectedExr.value = aExcercise;
  showExcerciseSelector.value = false;
}
// selectedExr - end ====
// dateReport - start ===
const showDateReport = ref(false);
// dateReport - end ===
const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];

const year = ref(2023);
const month = ref(2);

function up() {
  month.value += 1;
  if (month.value === 13) {
    year.value += 1;
    month.value = 1;
  }
}
function down() {
  month.value -= 1;
  if (month.value === 0) {
    year.value -= 1;
    month.value = 12;
  }
}

const calendar = computed(() => {
  const firstDay = new Date(year.value, month.value - 1, 1).getDay();
  const lastDay = new Date(year.value, month.value, 0);
  const length = lastDay.getDate();
  const dateArray = Array(length).fill(0).map((e, i) => i + 1);
  const dateWithGap: Array<number> = Array(firstDay).fill(undefined).concat(dateArray);
  const separtedByWeek = sliceIntoChunks(dateWithGap, 7);
  return separtedByWeek;
});

const cellStyle = computed(() => (calendar.value.length > 5 ? 'h-3' : 'h-4'));

function isSameDate(a: Date, b:Date) {
  return a.toDateString() === b.toDateString();
}

const data = ref<Work[]>([]);

const works = computed<WorkSortedExr[]>(() => convertExr(data.value, selectedExr.value.exrId));

function findWorks(date?: number) {
  return date ? works.value.filter((e) => isSameDate(new Date(e.startTime), new Date(year.value, month.value - 1, date))) : [];
}

function getCalendarCellProps(date?: number) {
  const r: CalendarCellProps = {
    style: cellStyle.value,
  };
  if (!date) return r;
  const filteredWorks = findWorks(date);
  r.date = date.toString();
  if (filteredWorks.length === 0) return r;
  const exrs = filteredWorks.map((e) => e.exrs).flat();
  const filteredExrs = exrs.filter((e) => selectedExr.value.exrId === -1 || e.exrId === selectedExr.value.exrId);
  if (filteredExrs.length === 0) return r;
  const mappedSets = filteredExrs.map((e) => e.sets).flat();
  r.time = msToTimeTextWithHour(mappedSets.reduce((t, c) => t + c.totalMs, 0));
  r.set = `${mappedSets.length} set`;
  r.rep = `${mappedSets.reduce((t, c) => t + c.reps, 0)} rep`;
  return r;
}

const selectedCalendarData = ref<WorkSortedExr[]>([]);
async function cellClick(date?: number) {
  const apple = await axios.get('/record/0');
  console.log(apple.data);
  selectedCalendarData.value = findWorks(date);
  if (selectedCalendarData.value.length !== 0) {
    showDateReport.value = true;
  }
}

onMounted(async () => {
  const rawData = await axios.get('/record/0');
  data.value = rawData.data;
});

</script>
<template>
  <div class="p-5">
    <div class="px-4 flex items-center justify-between">
      <span class="font-bold">{{ year }}.{{ month }}</span>
      <div class="flex items-center py-3">
        <JButton class="px-1" @click="down">
          <JSvg type="left-cramps" />
        </JButton>
        <JButton class="px-1 ml-3" @click="up">
          <JSvg type="right-cramps" />
        </JButton>
      </div>
    </div>
    <div class="py-3" @click="showExcerciseSelector = true">
      <JInputText v-model="selectedExr.exrName" readonly />
    </div>
    <div class="border-2 rounded-lg pt-3 pb-4 h-26rem">
      <table class="w-full text-center table-fixed">
        <thead>
          <tr>
            <th v-for="day in dayOfTheWeek" :key="day">
              <div class="w-full flex justify-center pb-2">
                <p class="text-lg text-center ">
                  {{ day }}
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, i) in calendar" :key="i">
            <td v-for="(date, j) in week" :key="`${i}-${j}`">
              <div @click="cellClick(date)">
                <CalendarCell
                  v-bind="getCalendarCellProps(date)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="h-20 grid py-3">
      <JButton label="그래프로 보기 (준비중)" disabled />
    </div>
  </div>
  <Teleport to="body">
    <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showExcerciseSelector === true">
      <template #body>
        <ExcerciseSelector v-model="selectedExr" :excercises="excercises" :use-entire="true" @cancel="showExcerciseSelector = false" @do-select="changeExcercise" />
      </template>
    </JBottomSheet>
  </Teleport>
  <Teleport to="body">
    <JBottomSheet class="text-3xl font-semibold text-gray-800" :show="showDateReport === true">
      <template #body>
        <DateReport :works="selectedCalendarData">
          <button class="text-slate-50 rounded-lg bg-slate-700 h-14 text-xl" @click="showDateReport = false">
            확인
          </button>
        </DateReport>
      </template>
    </JBottomSheet>
  </Teleport>
</template>
<style>
.h-26rem {
  height: 26rem;
}
</style>
