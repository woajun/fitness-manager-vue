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
  setTimeText: (t: string) => void;

  recentStartTime: number;

  intervalID: number;

  keepDuration: number;

  setIsRun: (b: boolean) => void;

  getIsRun: () => boolean;

  now: number;

  constructor(
    setTimeText: (t: string) => void,
    setIsRun: (b: boolean) => void,
    getIsRun: () => boolean,
  ) {
    this.setTimeText = setTimeText;
    this.setIsRun = setIsRun;
    this.getIsRun = getIsRun;
    this.setTimeText('00:00:00');
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
    this.setTimeText(this.getTimeText());
  };

  start() {
    if (this.getIsRun()) return;
    clearInterval(this.intervalID);
    this.recentStartTime = new Date().getTime();
    this.intervalID = setInterval(this.#doTimer, 10);
    this.setIsRun(true);
  }

  stop() {
    if (!this.getIsRun()) return;
    clearInterval(this.intervalID);
    this.keepDuration = this.getMs();
    this.setIsRun(false);
  }

  reset() {
    clearInterval(this.intervalID);
    this.setTimeText('00:00:00');
    this.keepDuration = 0;
    this.setIsRun(false);
  }

  getTimeText() {
    return msToTimeText(this.getMs());
  }
}

export default StopWatch;
