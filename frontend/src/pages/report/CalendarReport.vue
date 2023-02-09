<script lang="ts" setup>
import { computed, ref } from 'vue';
import JInputText from '../../components/JInputText.vue';
import { msToTimeTextWithHour, sliceIntoChunks } from '../../components/helper';
import JSvg from '../../components/JSvg.vue';
import JButton from '../../components/JButton.vue';
import CalendarCell, { type CalendarCellProps } from './CalendarCell.vue';
import data from '../../data/calendarData';

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

const excercise = ref('전체');

const cellStyle = computed(() => (calendar.value.length > 5 ? 'h-3' : 'h-4'));

function getCalendarCellProps(date?: number) {
  const r: CalendarCellProps = {
    style: cellStyle.value,
  };
  if (!date) return r;
  const dateString = new Date(year.value, month.value - 1, date).toDateString();
  const filtered = data.filter((e) => new Date(e.startTime).toDateString() === dateString);
  r.date = date.toString();
  if (filtered.length === 0) return r;
  r.time = msToTimeTextWithHour(filtered.reduce((t, c) => t + c.totalMs, 0));
  r.set = filtered.reduce((t, c) => t + c.sets.length, 0).toString();
  r.rep = filtered.reduce((total, cur) => total + cur.sets.reduce((t, c) => t + c.reps, 0), 0).toString();
  return r;
}
</script>
<template>
  <body>
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
      <div class="py-3">
        <JInputText v-model="excercise" readonly />
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
                <CalendarCell
                  v-bind="getCalendarCellProps(date)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="h-20 grid py-3">
        <JButton label="그래프로 보기" />
      </div>
    </div>
  </body>
</template>
<style>
.h-26rem {
  height: 26rem;
}
</style>
