import type { Ref } from 'vue';
import { to00 } from './helper';

/* eslint-disable no-plusplus */

class StopWatch {
  timeText: Ref<string>;

  sTime: Date;

  intervalID: number;

  keepDuration: number;

  isRun: Ref<boolean>;

  now: number;

  constructor(timeText: Ref<string>, isRun: Ref<boolean>) {
    this.timeText = timeText;
    this.timeText.value = '00:00:00';
    this.sTime = new Date();
    this.intervalID = 0;
    this.keepDuration = 0;
    this.isRun = isRun;
    this.now = new Date().getTime();
  }

  getMs() {
    this.now = new Date().getTime();
    return this.now - this.sTime.getTime() + this.keepDuration;
  }

  #doTimer = () => {
    this.setTimeText(this.getMs());
  };

  start() {
    console.log('aaa');
    if (this.isRun.value) return;
    clearInterval(this.intervalID);
    this.sTime = new Date();
    this.intervalID = setInterval(this.#doTimer, 10);
    this.isRun.value = true;
  }

  stop() {
    if (!this.isRun.value) return;
    clearInterval(this.intervalID);
    this.keepDuration = this.getMs();
    this.isRun.value = false;
  }

  reset() {
    clearInterval(this.intervalID);
    this.timeText.value = '00:00:00';
    this.sTime = new Date();
    this.keepDuration = 0;
    this.isRun.value = false;
  }

  setTimeText(ms: number) {
    const rawH = ms / 1000 / 60 / 60;
    const h = Math.floor(rawH);
    const m = Math.floor((rawH - h) * 60);
    const s = Math.floor(((rawH - h) * 60 - m) * 60);
    const mSec = Math.floor((ms % 1000) / 10);

    if (rawH >= 1) {
      this.timeText.value = `${to00(h)}:${to00(m)}:${to00(s)}`;
    } else {
      this.timeText.value = `${to00(m)}:${to00(s)}:${to00(mSec)}`;
    }
  }
}

export default StopWatch;
