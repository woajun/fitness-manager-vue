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
import { uuid } from './helper';

// color start ====
const COLOR_PURPLE = 'rgb(91, 33, 182)';
const COLOR_RED = 'rgb(153, 27, 27)';
// color end ====
type ChartData = Record<string, unknown>;

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
  nowExrId: number
}>();

function toData(data: ChartData[], dataKey: string) {
  return data
    .filter((e) => e.exrId === props.nowExrId)
    .map((e) => e[dataKey]);
}

function toLabel(num: number) {
  const result = [];
  for (let i = 1; i <= num; i += 1) {
    result.push(`${i}set`);
  }
  return result;
}

const canvasId = uuid();

let lineChart: any;

onMounted(() => {
  const apple = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!apple) return;
  lineChart = new Chart(apple, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          data: toData(props.data, 'reps'),
          borderColor: COLOR_PURPLE,
        }, {
          data: toData(props.data, 'weight'),
          borderColor: COLOR_RED,
          yAxisID: 'y1',
        },
      ],
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
              if (typeof value === 'string' || value === 0) return '';
              return `${value}`;
            },
            color: COLOR_PURPLE,
            stepSize: 5,
            font: {
              size: 14,
            },
          },
        },
        y1: {
          position: 'left',
          min: 0,
          ticks: {
            callback(value) {
              if (typeof value === 'string' || value === 0) return '';
              return `${value}`;
            },
            stepSize: 10,
            color: COLOR_RED,
            font: {
              size: 14,
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 15,
            },
          },
        },
      },
      animations: {
        radius: {
          duration: 400,
          easing: 'linear',
          loop: (context) => context.active,
        },
      },
    },

  });
});

watch(props, (aProps) => {
  lineChart.data.labels = toLabel(aProps.data.reduce((t, c) => (c.exrId === props.nowExrId ? t + 1 : t), 0));
  lineChart.data.datasets[0].data = toData(aProps.data, 'reps');
  lineChart.data.datasets[1].data = toData(aProps.data, 'weight');
  lineChart.update();
});

</script>
<template>
  <canvas :id="canvasId" />
</template>
