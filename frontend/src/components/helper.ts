/* eslint-disable import/prefer-default-export */
export function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

function positive(ms:number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);
  const mSec = Math.floor((ms % 1000) / 10);

  return rawH >= 1 ? `${to00(h)}:${to00(m)}:${to00(s)}`
    : `${to00(m)}:${to00(s)}:${to00(mSec)}`;
}

function negative(ms: number) {
  return `-${positive(ms * -1)}`;
}

export function msToTimeText(ms: number) {
  return ms >= 0 ? positive(ms) : negative(ms);
}

export function secondsToMs(sec: number) {
  return sec * 1000;
}

export function msToTimeTextWithHour(ms: number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);

  return `${to00(h)}:${to00(m)}:${to00(s)}`;
}

export function makeNumberArray(length: number, from: number, unit: number) {
  return Array(length).fill(0).map((e, i) => from + (unit * i));
}
