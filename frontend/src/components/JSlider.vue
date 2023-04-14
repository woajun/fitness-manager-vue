<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{
  items: string[]
  modelValue: string
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

const liEls = ref<HTMLLIElement[]>([]);
const ulEl = ref<HTMLUListElement | null>(null);

const startTop = ref(0);
const startPos = ref(0);
const itemHeight = ref(0);

function autoMove(item: string) {
  if (!ulEl.value) return;
  const itemH = itemHeight.value;
  const order = props.items.indexOf(item) - 1;
  ulEl.value.style.top = `${(order * -itemH)}px`;
}

function setItem(value: string) {
  emits('update:modelValue', value);
}

function setItemAndAutoMove(item: string) {
  setItem(item);
  autoMove(item);
}

function handleStart(e: TouchEvent) {
  if (ulEl.value === null) return;
  startTop.value = Number(ulEl.value.style.top.substring(0, ulEl.value.style.top.length - 2));
  startPos.value = e.touches[0].pageY;
}

function handleMove(e: TouchEvent) {
  if (ulEl.value === null) return;
  e.preventDefault();
  const offset = e.touches[0].pageY - startPos.value;
  const minOffset = -(props.items.length - 2) * 50;
  const newTop = Math.min(Math.max(startTop.value + offset, minOffset), 50);
  const newIdx = Number(((-newTop + 50) / 50).toFixed());
  ulEl.value.style.top = `${newTop.toFixed()}px`;
  setItem(props.items[newIdx]);
}

function handleEnd() {
  setItemAndAutoMove(props.modelValue);
}

onMounted(() => {
  itemHeight.value = liEls.value[0].offsetHeight;
  setItemAndAutoMove(props.modelValue);
});

</script>
<template>
  <div class="slider-container">
    <ul
      ref="ulEl"
      class="slider-items transition"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    >
      <li
        v-for="item in items"
        :key="item"
        ref="liEls"
        class="slider-item"
        :class="{ active: modelValue === item }"
        @click="() => setItemAndAutoMove(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.slider-container {
  flex-grow: 1;
  height: 150px;
  overflow: hidden;
  position: relative;
}
.slider-items {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  top: 0;
  position: absolute;
}
.transition {
  transition: top .1s ease-out;
}
.slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c8c8c8;
  font-size: 2.5rem;
  font-weight: 500;
  height: 50px;
  font-family: "SpoqaB", serif;
}

.slider-item.active {
  color: #2f2f2f;
}
</style>
