import { atom } from 'jotai';

export const climateDataAtom = atom({
    fetched: false,
    PRECTOTCORR: {},
    T2M_MAX: {},
    T2M_MIN: {},
    T2M: {},
    WS2M: {},
    RH2M: {},
    PS: {},
    CLOUD_AMT: {},
    TS: {},
    FROST_DAYS: {},
    MAX: {},
    MIN: {},
    AVERAGES: {},
    frostDays: {},
    parameters: {}
});

export const langAtom = atom('ukr');