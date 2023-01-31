class StopWatch {
  setTimeText: (t: number) => void;

  recentStartTime: number;

  intervalID: number;

  keepDuration: number;

  setIsRun: (b: boolean) => void;

  getIsRun: () => boolean;

  now: number;

  constructor(
    setTimeText: (t: number) => void,
    setIsRun: (b: boolean) => void,
    getIsRun: () => boolean,
  ) {
    this.setTimeText = setTimeText;
    this.setIsRun = setIsRun;
    this.getIsRun = getIsRun;
    this.setTimeText(0);
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
    this.setTimeText(this.getMs());
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
    this.setTimeText(0);
    this.keepDuration = 0;
    this.setIsRun(false);
  }
}

export default StopWatch;
