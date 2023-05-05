<script lang="ts" setup>
import { Transition, ref } from 'vue';

const collapsed = ref(false);

function toggle() {
  collapsed.value = !collapsed.value;
}

</script>
<template>
  <div>
    <div @click="toggle">
      <slot name="header" />
    </div>
    <Transition name="collapse" mode="out-in">
      <div v-if="collapsed" class="collapseDIV">
        <slot />
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.collapseDIV {
  transform-origin: top;
}

.collapse-enter-active {
  animation: collapse reverse 500ms ease;
}
.collapse-leave-active {
  animation: collapse 500ms ease;
}

@keyframes collapse {
  from {
    transform: scaleY(1);
    opacity: 1;
  }
  to {
    transform: scaleY(0);
    opacity: 0;
  }
}
</style>
