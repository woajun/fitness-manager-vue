import { ref, type Ref } from 'vue';
import StopWatch from './stopWatch';

class Timer {
  restSec: Ref<number>;

  isRun: Ref<boolean>;

  isTimeout: Ref<boolean>;

  stopWatch: StopWatch;

  constructor(restSec: Ref<number>, isRun: Ref<boolean>, isTimeout: Ref<boolean>) {
    this.restSec = restSec;
    this.isRun = isRun;
    this.isTimeout = isTimeout;
    this.stopWatch = new StopWatch(ref(''), isRun);
  }

  start() {
    return this.isRun;
  }

  stop() {
    return this.isRun;
  }

  reset() {
    return this.isRun;
  }
}

export default Timer;
