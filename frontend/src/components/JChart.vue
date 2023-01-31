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

function toLabel(num: number) {
  const result = [];
  for (let i = 1; i <= num; i += 1) {
    result.push(`${i}set`);
  }
  return result;
}

function getMax(data: Record<string, number>[]) {
  if (data.length < 1) {
    return 0;
  }
  return Math.max(...data.map((e) => e.value));
}

const canvasId = crypto.randomUUID();

let lineChart: any;

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
          grid: {
            display: false,
          },
          min: 0,
          ticks: {
            callback(value) {
              const second = value as number;
              if (second < 10) {
                return `${second.toFixed(1)} 초`;
              }
              return `${Math.floor(second)}초`;
            },
          },
          weight: 0,
        },
      },
      animation: {
        duration: 0,
      },
    },
  });
});

watch(props, (aProps) => {
  lineChart.data.labels = toLabel(aProps.data.length);
  lineChart.data.datasets[0] = { data: toData(aProps.data) };
  lineChart.options.scales.y.ticks.stepSize = getMax(aProps.data);
  lineChart.update();
});

</script>
<template>
  <canvas :id="canvasId" />
</template>
