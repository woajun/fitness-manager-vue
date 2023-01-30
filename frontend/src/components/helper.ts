/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

type Iterate = {
  (num: number):number[];
  <T>(num: number, fill?:T):T[];
  (num: number, fill?:unknown):unknown[];
};
export const iterate: Iterate = (num: number, fill?:unknown) => {
  if (fill !== undefined) {
    return Array(num).fill(fill);
  }
  return Array(num).fill(0).map((e, i) => i);
};

let idGenerator = 0;
export const newID = () => {
  idGenerator += 1;
  return idGenerator;
};

export function shuffle<T>(arr:Array<T>):Array<T> {
  // const arr = JSON.parse(JSON.stringify(rawArr));
  let i = arr.length;
  let randomI : number;

  while (i !== 0) {
    randomI = Math.floor(Math.random() * i);
    i--;

    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[randomI]] = [arr[randomI], arr[i]];
  }
  return arr;
}

export function deepcopy<T>(target:Array<T>):Array<T> {
  return JSON.parse(JSON.stringify(target));
}

export function spliteToInt(target:number, piece: number) {
  const el = Math.floor(target / piece);
  const rest = target % piece;
  const splited = iterate(piece, el);
  iterate(rest).forEach((i) => {
    splited[i] += 1;
  });
  return splited;
}

export function splitInt(target:number, piece: number) {
  const el = Math.floor(target / piece);
  return iterate(piece, el);
}

export function calcRest(target:number, piece: number) {
  return target % piece;
}

export function dateFormat(date:Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const mm = m < 10 ? `0${m}` : m;
  const d = date.getDate();
  const dd = d < 10 ? `0${d}` : d;
  return `${y}-${mm}-${dd}`;
}

export function getMonthLength(y:number, m: number) {
  return new Date(y, m, 0).getDate();
}

export function getDatesArray(y:number, m: number) {
  return iterate(getMonthLength(y, m)).map((i) => i + 1);
}
