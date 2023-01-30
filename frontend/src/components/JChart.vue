<script lang="ts" setup>
/* eslint-disable vue/max-len */
import {
  Chart,
  Colors,
  TimeScale,
  Title,
  Tooltip,
  LineController, LineElement, LinearScale, PointElement,
  CategoryScale,
} from 'chart.js';
import { onMounted, watch } from 'vue';

Chart.register(
  Title,
  Tooltip,
  Colors,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
);

const props = defineProps<{
  data: Record<string, number>[]
}>();

function toData(data: Record<string, number>[]): number[] {
  return data.map((e) => e.value);
}

const canvasId = crypto.randomUUID();

let lineChart: Chart;

onMounted(() => {
  const apple = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!apple) return;
  lineChart = new Chart(apple, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: toData(props.data),
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          position: 'right',
        },
      },
    },
  });
});

watch(props, (aProps) => {
  console.log('aaa');
  // lineChart.data.labels = toLabel(aProps.data.length);
  lineChart.data.datasets[0] = { data: toData(aProps.data) };
  lineChart.update();
});

</script>
<template>
  <canvas :id="canvasId" />
</template>
