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
  dataKey: string
  fontColor: string
  unit: string
}>();

function toData(data: ChartData[]) {
  return data.map((e) => e[props.dataKey]);
}

function toLabel(num: number) {
  const result = [];
  for (let i = 1; i <= num; i += 1) {
    result.push(`${i}set`);
  }
  return result;
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
                return `${second.toFixed(1)} ${props.unit}`;
              }
              return `${Math.floor(second)} ${props.unit}`;
            },
            // color: 'rgb(248 250 252)',
            color: props.fontColor,
            font: {
              size: 15,
            },
          },
        },
        x: {
          ticks: {
            // color: 'rgb(248 250 252)',
            color: props.fontColor,
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
  lineChart.data.labels = toLabel(aProps.data.length);
  lineChart.data.datasets[0] = { data: toData(aProps.data), borderColor: 'rgb(91, 33, 182)' };
  lineChart.options.scales.y.ticks.color = aProps.fontColor;
  lineChart.options.scales.x.ticks.color = aProps.fontColor;
  lineChart.update();
});

</script>
<template>
  <canvas :id="canvasId" />
</template>
