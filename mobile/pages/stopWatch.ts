/* eslint-disable no-unused-vars */
class StopWatch {
  setTimeText: (t: number) => void;

  recentStartTime: number;

  intervalID: number;

  keepDuration: number;

  setIsRunTrigger: (b: boolean) => void;

  now: number;

  isRun: boolean;

  constructor(
    setTimeText: (t: number) => void,
    setIsRunTrigger: (b: boolean) => void,
  ) {
    this.setTimeText = setTimeText;
    this.setIsRunTrigger = setIsRunTrigger;
    this.setTimeText(0);
    this.recentStartTime = new Date().getTime();
    this.intervalID = 0;
    this.keepDuration = 0;
    this.now = new Date().getTime();
    this.isRun = false;
  }

  getMs() {
    this.now = new Date().getTime();
    return this.keepDuration + (this.now - this.recentStartTime);
  }

  doTimer = () => {
    this.setTimeText(this.getMs());
  };

  start() {
    if (this.isRun) return;
    clearInterval(this.intervalID);
    this.recentStartTime = new Date().getTime();
    this.intervalID = setInterval(this.doTimer, 10);
    this.setIsRun(true);
  }

  stop() {
    if (!this.isRun) return;
    clearInterval(this.intervalID);
    this.keepDuration = this.getMs();
    this.setIsRun(false);
  }

  reset() {
    clearInterval(this.intervalID);
    this.setTimeText(0);
    this.keepDuration = 0;
    this.setIsRun(false);
  }

  setIsRun(bool: boolean) {
    this.isRun = bool;
    this.setIsRunTrigger(this.isRun);
  }

  setKeepDuration(ms: number) {
    this.keepDuration = ms;
  }
}

export default StopWatch;
