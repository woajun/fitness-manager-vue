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

export type CalendarData = {
  date: string;
  time: string;
  set: number;
  rep: number;
};
