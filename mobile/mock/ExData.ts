export type Exercise = {
    id: number,
    name: string,
    kgStart: number,
    kgMin: number,
    kgMax: number,
    kgUnit: number
}

export const exDatas: Exercise[] = [
  {
    id: 0,
    name: '바벨컬',
    kgStart: 15,
    kgMin: 10,
    kgMax: 100,
    kgUnit: 5,
  },
  {
    id: 1,
    name: '스쿼트',
    kgStart: 20,
    kgMin: 0,
    kgMax: 150,
    kgUnit: 5,
  },
  {
    id: 2,
    name: '벤트오버 레터럴 레이즈',
    kgStart: 8,
    kgMin: 4,
    kgMax: 100,
    kgUnit: 2,
  },
  {
    id: 3,
    name: '사이드 레터럴 레이즈',
    kgStart: 8,
    kgMin: 4,
    kgMax: 100,
    kgUnit: 2,
  },
  {
    id: 4,
    name: '행잉 레그 레이즈',
    kgStart: 0,
    kgMin: 0,
    kgMax: 100,
    kgUnit: 2,
  },
  {
    id: 5,
    name: '턱걸이(풀업)',
    kgStart: 0,
    kgMin: 0,
    kgMax: 100,
    kgUnit: 5,
  },
  {
    id: 6,
    name: '턱걸이(친업)',
    kgStart: 0,
    kgMin: 0,
    kgMax: 100,
    kgUnit: 5,
  },
];
