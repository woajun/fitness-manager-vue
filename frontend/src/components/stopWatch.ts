import type { Ref } from 'vue';

/* eslint-disable no-plusplus */
function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

class StopWatch {
  timeText: Ref<string>;

  sTime: Date;

  intervalID: number;

  keepDuration: number;

  isRun: boolean;

  now: number;

  constructor(timeText: Ref<string>) {
    this.timeText = timeText;
    this.timeText.value = '00:00:00';
    this.sTime = new Date();
    this.intervalID = 0;
    this.keepDuration = 0;
    this.isRun = false;
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
    if (this.isRun) return;
    clearInterval(this.intervalID);
    this.sTime = new Date();
    this.intervalID = setInterval(this.#doTimer, 10);
    this.isRun = true;
  }

  stop() {
    if (!this.isRun) return;
    clearInterval(this.intervalID);
    this.keepDuration = this.getMs();
    this.isRun = false;
  }

  reset() {
    clearInterval(this.intervalID);
    this.timeText.value = '00:00:00';
    this.sTime = new Date();
    this.keepDuration = 0;
    this.isRun = false;
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
