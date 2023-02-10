import type { Exr, Work, WorkSortedExr } from '@/interfaces';
import excercises from '@/data/excercises';

export function getExrName(id: number) {
  const result = excercises.find((e) => e.id === id);
  return result ? result.label : '';
}

function sortByExcercise(work: Work): Exr[] {
  const exrIds = [...new Set(work.sets.map((set) => set.exrId))];
  return exrIds.map((exrId) => ({
    exrId,
    exrName: getExrName(exrId),
    sets: work.sets.filter((w) => w.exrId === exrId),
  }));
}

export function convertExr(works: Work[]): WorkSortedExr[] {
  return works.map((work) => ({
    startTime: work.startTime,
    totalMs: work.totalMs,
    id: work.id,
    exrs: sortByExcercise(work),
  }));
}
