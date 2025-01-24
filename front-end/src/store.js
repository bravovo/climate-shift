import { configureStore } from "@reduxjs/toolkit";
import monthlyClimateDataReducer from "./state/monthlyClimateData/monthlyClimateDataSlice";
import dataLangReducer from "./state/dataLang/dataLangSlice";
import yearsClimateDataReducer from "./state/yearsClimateData/yearsClimateDataSlice";
import coordsReducer from './state/coords/coordsSlice';

export const store = configureStore({
    reducer: {
        monthlyClimateData: monthlyClimateDataReducer,
        yearsClimateData: yearsClimateDataReducer,
        dataLang: dataLangReducer,
        coords: coordsReducer,
    },
});
