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
    <div class="collapse-container">
      <Transition name="collapse" mode="out-in">
        <template v-if="collapsed">
          <slot />
        </template>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.collapse-container {
  overflow: hidden;
  display: flex;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all .5s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  margin-top: -100%;
}
</style>
