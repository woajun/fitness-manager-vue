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
