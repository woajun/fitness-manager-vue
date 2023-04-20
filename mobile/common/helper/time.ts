export function to00(r: number) {
  return r < 10 ? `0${r}` : `${r}`;
}

export function msTo(ms: number) {
  const rawH = ms / 1000 / 60 / 60;
  const h = Math.floor(rawH);
  const m = Math.floor((rawH - h) * 60);
  const s = Math.floor(((rawH - h) * 60 - m) * 60);
  const sss = Math.floor((ms % 1000) / 100);
  return {
    h, m, s, sss,
  };
}
export function msToHHMMSS(ms: number) {
  const { h, m, s } = msTo(ms);
  return `${to00(h)}:${to00(m)}:${to00(s)}`;
}

export function msToMMSSsss(ms:number) {
  const { m, s, sss } = msTo(ms);
  return `${to00(m)}:${to00(s)}.${sss}`;
}
