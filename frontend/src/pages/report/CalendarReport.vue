<script lang="ts" setup>
import { computed, ref } from 'vue';
import { to00, sliceIntoChunks } from '../../components/helper';
import JSvg from '../../components/JSvg.vue';
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
  const dateWithGap = Array(firstDay).fill('').concat(dateArray);
  const separtedByWeek = sliceIntoChunks(dateWithGap, 7);
  return separtedByWeek;
});
</script>
<template>
  <body>
    <div class="p-5">
      <div class="px-4 flex items-center justify-between">
        <span class="text-base font-bold">{{ year }}.{{ month }}</span>
        <div class="flex items-center">
          <button @click="down">
            <JSvg type="left-cramps" />
          </button>
          <button class="ml-3" @click="up">
            <JSvg type="right-cramps" />
          </button>
        </div>
      </div>
      <table class="w-full text-center">
        <thead>
          <tr>
            <th v-for="day in dayOfTheWeek" :key="day">
              <div class="w-full flex justify-center">
                <p class="text-base text-center ">
                  {{ day }}
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, i) in calendar" :key="i">
            <td v-for="(date, j) in week" :key="`${i}-${j}`">
              <p v-if="date" class="text-base font-medium h-5">
                {{ date }}
              </p>
              <p class="text-xs font-medium h-4">
                <!-- {{ date.time }} -->
              </p>
              <p class="text-xs font-medium h-4">
                <!-- {{ date.set ? `${date.set}set` : '' }} -->
              </p>
              <p class="text-xs font-medium h-4">
                <!-- {{ date.rep ? `${date.rep}rep` : '' }} -->
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</template>
