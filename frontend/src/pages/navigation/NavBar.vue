<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean
}>();

type Emit = {
  (e: 'update:modelValue', isInWork: boolean): void;
};
const emit = defineEmits<Emit>();

const checked = ref(false);

function clickEvent(isInWork:boolean) {
  emit('update:modelValue', isInWork);
  checked.value = !checked.value;
}

</script>
<template>
  <nav class="absolute">
    <div class="menuToggle">
      <input v-model="checked" type="checkbox" />
      <span />
      <span />
      <span />
      <ul class="menu">
        <li @click="() => clickEvent(true)">
          기록
        </li>
        <li @click="() => clickEvent(false)">
          캘린더
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>

.menuToggle {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 1;
}

.menuToggle input
{
  display: flex;
  width: 40px;
  height: 32px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

.menuToggle span
{
  display: flex;
  width: 29px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  background: #36383F;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 5px 0px;
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

.menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

.menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

.menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-3px, -1px);
  background: #36383F;
}
.menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

.menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

.menu
{
  position: absolute;
  width: 180px;
  height: 400px;
  box-shadow: 0 0 10px #85888C;
  margin: -50px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  background-color: #F5F6FA;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

.menu li
{
  padding: 10px 0;
  transition-delay: 2s;
}

.menuToggle input:checked ~ ul
{
  transform: none;
}
</style>
