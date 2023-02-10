import type { Work, WorkSortedExr } from './interfaces';
import excercises from '@/data/excercises';

export function getExrName(id: number) {
  const result = excercises.find((e) => e.exrId === id);
  return result ? result.exrName : '';
}

function sortByExcercise(work: Work) {
  const exrIds = [...new Set(work.sets.map((set) => set.exrId))];
  return exrIds.map((exrId) => ({
    exrId,
    exrName: getExrName(exrId),
    sets: work.sets.filter((w) => w.exrId === exrId),
  }));
}

export function convertExr(works: Work[], id: number): WorkSortedExr[] {
  return works.map((work) => ({
    startTime: work.startTime,
    totalMs: work.totalMs,
    id: work.id,
    exrs: sortByExcercise(work).filter((e) => id === -1 || e.exrId === id),
  }));
}
