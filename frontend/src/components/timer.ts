/* eslint-disable no-plusplus */
import type { Ref } from 'vue';

function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

class Timer {
  ms: Ref<number>;

  intervalID: number;

  constructor(ms: Ref<number>) {
    this.ms = ms;
    this.intervalID = 0;
  }

  #doTimer = () => {
    this.ms.value++;
  };

  start() {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.#doTimer, 10);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  reset() {
    clearInterval(this.intervalID);
    this.ms.value = 0;
  }

  getMillis() {
    const r = (this.ms.value % 100);
    return to00(r);
  }

  getSeconds() {
    const sec = Math.round((this.ms.value % 6000) / 100);
    return to00(sec);
  }

  getMinutes() {
    const m = Math.floor(this.ms.value / 6000);
    return to00(m);
  }
}

export default Timer;
