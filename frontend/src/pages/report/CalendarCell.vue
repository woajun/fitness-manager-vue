<script lang="ts" setup>
export type CalendarCellProps = {
  date?: string;
  time?: string;
  set?: string;
  rep?: string;
  style?: string;
};
defineProps<CalendarCellProps>();

</script>
<template>
  <div>
    <p v-if="date" class="text-base font-medium h-5">
      {{ date }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ time }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ set }}
    </p>
    <p class="text-xs font-medium h-4" :class="style">
      {{ rep }}
    </p>
  </div>
</template>
