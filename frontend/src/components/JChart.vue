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

type ChartData = {
  seconds: number,
};

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
  data: ChartData[]
}>();

function toData(data: ChartData[]): number[] {
  return data.map((e) => e.seconds);
}

function toLabel(num: number) {
  const result = [];
  for (let i = 1; i <= num; i += 1) {
    result.push(`${i}set`);
  }
  return result;
}

function getMax(data: ChartData[]) {
  if (data.length < 1) {
    return 0;
  }
  return Math.max(...data.map((e) => e.seconds));
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
              if (second === 0) {
                return '';
              }
              if (second < 10) {
                return `${second.toFixed(1)} 초`;
              }
              return `${Math.floor(second)} 초`;
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
