export type Records = {
  exrID: number;
  weight: number;
  rep: number;
  restSec: number;
  totalSec: number;
  recordDate: Date;
};

export type SaveRequestDTO = {
  memberID: number;
  startDate: Date;
  totalTime: number;
  sets: Records[]
};

export type Excercise = {
  id: number;
  label: string;
};

// new type
export type Set = {
  id: number;
  exrId: number;
  weight: number;
  reps: number;
  restMs: number;
  totalMs: number;
  recordTime: string;
};

export type Exr = {
  exrId: number,
  exrName: string,
  sets: Set[]
};

export type Work = {
  startTime: string;
  totalMs: number;
  id: number;
  sets: Set[];
};

export type WorkSortedExr = {
  startTime: string;
  totalMs: number;
  id: number;
  exrs: Exr[]
};
