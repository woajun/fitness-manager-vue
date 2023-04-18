import React from 'react';

export default class Stopwatch {
  setTime: React.Dispatch<React.SetStateAction<number>>;

  #startTime = 0;

  #intervalID = 0;

  #keepTime = 0;

  constructor(setTime: any) {
    this.setTime = setTime;
  }

  getTime() {
    return this.#keepTime + (Date.now() - this.#startTime);
  }

  run() {
    this.#startTime = Date.now();

    clearInterval(this.#intervalID);
    this.#intervalID = setInterval(() => {
      this.setTime(this.getTime());
    }, 1000);
  }

  pause() {
    this.#keepTime = this.getTime();
    clearInterval(this.#intervalID);
  }

  reset() {
    const result = this.getTime();
    clearInterval(this.#intervalID);
    this.#startTime = Date.now();
    this.#intervalID = 0;
    this.#keepTime = 0;
    this.setTime(this.getTime());
    return result;
  }
}
