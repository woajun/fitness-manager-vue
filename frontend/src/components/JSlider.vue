<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{
  items: unknown[],
  modelValue: unknown,
  itemH: number,
  showItemNumber: number,
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: unknown): void,
}>();

const liEls = ref<HTMLLIElement[]>([]);
const ulEl = ref<HTMLUListElement | null>(null);

const startTop = ref(0);
const startPos = ref(0);
const itemHeight = ref(0);

const maximumTop = ((props.showItemNumber - 1) / 2) * props.itemH;
const minumumTop = -(props.items.length - ((1 + props.showItemNumber) / 2)) * props.itemH;

function autoMove(item: unknown) {
  if (!ulEl.value) return;
  const itemH = itemHeight.value;
  const order = props.items.indexOf(item) - ((props.showItemNumber - 1) / 2);
  ulEl.value.style.top = `${(order * -itemH)}px`;
}

function setItem(value: unknown) {
  emits('update:modelValue', value);
}

function setItemAndAutoMove(item: unknown) {
  setItem(item);
  autoMove(item);
}

function handleStart(e: TouchEvent) {
  if (!ulEl.value) return;
  const pxTxt = ulEl.value.style.top;
  startTop.value = Number(pxTxt.substring(0, pxTxt.length - 2));
  startPos.value = e.touches[0].pageY;
}

function handleMove(e: TouchEvent) {
  if (!ulEl.value) return;
  e.preventDefault();

  const currentPos = e.touches[0].pageY;
  const btwnPos = currentPos - startPos.value;
  const newTop = Math.min(Math.max(startTop.value + btwnPos, minumumTop), maximumTop);
  ulEl.value.style.top = `${newTop.toFixed()}px`;

  const centerTop = props.itemH * ((props.showItemNumber - 1) / 2);
  const newIdx = Number(((centerTop - newTop) / props.itemH).toFixed());
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
  <div
    class="slider-container"
    :style="{ height: `${itemH * showItemNumber}px` }"
  >
    <ul
      ref="ulEl"
      class="slider-items transition"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    >
      <li
        v-for="item in items"
        :key="String(item)"
        ref="liEls"
        class="slider-item"
        :class="{ active: modelValue === item }"
        :style="{ height: `${itemH}px` }"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.slider-container {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  border-width: 2px;
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
  font-weight: 500;
  font-family: "SpoqaB", serif;
  font-size: 1.5rem;
}

.slider-item.active {
  color: #2f2f2f;
}
</style>
