export type Set = {
  id?: number;
  exrId: number;
  reps: number;
  weight: number;
  restMs: number;
  totalMs: number;
  recordTime: string | Date;
};

export type Exr = {
  exrId: number,
  exrName: string,
};

export type Work = {
  id?: number;
  memberId?: number;
  startTime: string;
  totalMs: number;
  sets: Set[];
};

export type WorkSortedExr = {
  id?: number;
  startTime: string;
  totalMs: number;
  exrs: Array<Exr & {sets: Set[]}>
};
