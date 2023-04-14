<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

interface Item {
  key: string,
  isActive: boolean,
}

const props = defineProps<{
  items: string[]
}>();

defineEmits<{
  (e: 'onValueChanged', value: string): void,
}>();

const cptItems = computed<Item[]>(() => props.items.map((key) => ({
  key,
  isActive: false,
})));

const currentItem = ref<Item>(cptItems.value[0]);

function setValue(value: string) {
  const targetItem = cptItems.value.find((e) => e.key === value);
  if (targetItem === undefined) {
    alert(`Invalid slider value ${value}`);
    return;
  }
  currentItem.value.isActive = false;
  currentItem.value = targetItem;
  currentItem.value.isActive = true;
}

const itemRefs = ref<HTMLLIElement[]>([]);
const ulEl = ref<HTMLUListElement | null>(null);

setValue(cptItems.value[0].key);

const startTop = ref(0);
const startPos = ref(0);

onMounted(() => {
  // const itemHeight = itemRefs.value[0].offsetHeight;
});

const isTransition = ref(false);

function handleStart(e: TouchEvent) {
  if (ulEl.value === null) {
    alert('error');
    return;
  }
  startTop.value = Number(ulEl.value.style.top.substring(0, ulEl.value.style.top.length - 2));
  startPos.value = e.touches[0].pageY;
  isTransition.value = false;
}

function handleMove(e: TouchEvent) {
  if (ulEl.value === null) {
    alert('error');
    return;
  }
  e.preventDefault();
  const offset = e.touches[0].pageY - startPos.value;
  const minOffset = -(cptItems.value.length - 2) * 50;

  const newTop = Math.min(Math.max(startTop.value + offset, minOffset), 50);
  const newIdx = Number(((-newTop + 50) / 50).toFixed());
  ulEl.value.style.top = `${newTop.toFixed()}px`;
  setValue(cptItems.value[newIdx].key);
}

function handleEnd() {
  isTransition.value = true;
  setValue(currentItem.value.key);
}

</script>
<template>
  <div class="flex-grow slider-container">
    <ul
      ref="ulEl"
      class="slider-items"
      :class="{ transition: isTransition }"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    >
      <li
        v-for="item in cptItems"
        :key="item.key"
        ref="itemRefs"
        class="slider-item"
        :class="{ active: item.isActive }"
        @click="() => setValue(item.key)"
      >
        {{ item.key }}
      </li>
    </ul>
  </div>
</template>
<style>
.flex-grow {
  flex-grow: 1;
}
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
.slider-items.transition {
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
