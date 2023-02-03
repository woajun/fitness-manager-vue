<script lang="ts" setup>
const props = defineProps<{
  show: boolean,
}>();
</script>
<template>
  <div class="overflow-hidden">
    <div class="expandable" :class="{ expanded: props.show }">
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
