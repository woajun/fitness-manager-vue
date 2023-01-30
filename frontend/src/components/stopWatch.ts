import type { Ref } from 'vue';
import { to00 } from './helper';

/* eslint-disable no-plusplus */

function msToTimeText(ms: number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);
  const mSec = Math.floor((ms % 1000) / 10);

  return rawH >= 1 ? `${to00(h)}:${to00(m)}:${to00(s)}`
    : `${to00(m)}:${to00(s)}:${to00(mSec)}`;
}
class StopWatch {
  timeText: Ref<string>;

  recentStartTime: number;

  intervalID: number;

  keepDuration: number;

  isRun: Ref<boolean>;

  now: number;

  constructor(timeText: Ref<string>, isRun: Ref<boolean>) {
    this.timeText = timeText;
    this.isRun = isRun;
    this.timeText.value = '00:00:00';
    this.recentStartTime = new Date().getTime();
    this.intervalID = 0;
    this.keepDuration = 0;
    this.now = new Date().getTime();
  }

  getMs() {
    this.now = new Date().getTime();
    return this.keepDuration + (this.now - this.recentStartTime);
  }

  #doTimer = () => {
    this.timeText.value = this.getTimeText();
  };

  start() {
    if (this.isRun.value) return;
    clearInterval(this.intervalID);
    this.recentStartTime = new Date().getTime();
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
    this.keepDuration = 0;
    this.isRun.value = false;
  }

  getTimeText() {
    return msToTimeText(this.getMs());
  }
}

export default StopWatch;
