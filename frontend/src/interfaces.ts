export type WorkingRep = {
  times: number;
  weight: number;
  breakTime: number;
  workingTime: number;
  order: number;
};

export type WorkingSet = {
  excerciseID: number;
  order: number;
  reps: WorkingRep[];
};

export type SaveRequestDTO = {
  memberID: number;
  startDate: Date;
  totalTime: number;
  sets: WorkingSet[]
};

export type Excercise = {
  id: number;
  label: string;
};

export type Records = {
  exrID: number;
  weight: number;
  rep: number;
  restSec: number;
  totalSec: number;
};

export type CalendarData = {
  date: string;
  time: string;
  set: number;
  rep: number;
};
