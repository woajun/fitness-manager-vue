/* eslint-disable import/prefer-default-export */
export function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

export function msToTimeText(ms: number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);
  const mSec = Math.floor((ms % 1000) / 10);

  return rawH >= 1 ? `${to00(h)}:${to00(m)}:${to00(s)}`
    : `${to00(m)}:${to00(s)}:${to00(mSec)}`;
}
