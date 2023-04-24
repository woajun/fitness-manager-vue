export type Excercise = {
    id: number,
    name: string,
    kgStart: number,
    kgMin: number,
    kgMax: number,
    kgUnit: number
    repStart: number,
}

export type Record = {
    userId: string,
    exrId: number,
    kg: number,
    rep: number,
    ms: number,
    at: Date
}
