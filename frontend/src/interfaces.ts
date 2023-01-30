type Rep = {
  times: number;
  weight: number;
  breakTime: number;
  workingTime: number;
  order: number;
};

type Set = {
  excerciseID: number;
  order: number;
  reps: Rep[];
};

export type SaveRequestDTO = {
  memberID: number;
  startDate: Date;
  totalTime: number;
  sets: Set[]
};
