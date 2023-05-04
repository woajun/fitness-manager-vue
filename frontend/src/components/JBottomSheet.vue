<!-- eslint-disable no-spaced-func -->
<script setup lang="ts">
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits<{ (e: 'close'): void
}>();
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container flex">
        <div class="modal-header">
          <slot name="header" />
        </div>

        <div class="modal-body">
          <slot name="default">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: .3s cubic-bezier(.25,.8,.25,1);
}

.modal-container {
  height: 90%;
  align-self: flex-end;
  width: 100%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
  transition: .3s cubic-bezier(.25,.8,.25,1);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform:translateY(100%)
}
</style>
