import { configureStore } from '@reduxjs/toolkit'
import monthlyClimateDataReducer from './state/monthlyClimateData/monthlyClimateDataSlice';
import dataLangReducer from './state/dataLang/dataLangSlice';

export const store = configureStore({
    reducer: {
        monthlyClimateData: monthlyClimateDataReducer,
        dataLang: dataLangReducer
  },
})