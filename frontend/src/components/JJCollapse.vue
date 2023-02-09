<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
</script>
<template>
  <div @click="show = !show">
    <slot name="header" />
    ▼
  </div>
  <div class="overflow-hidden">
    <div class="expandable" :class="{ expanded: show }">
      <slot />
    </div>
  </div>
</template>
<style>
.expandable {
  margin-top: -100%;
  transition: all 0.5s;
}
.expandable.expanded {
  margin-top: 0;
}
</style>
