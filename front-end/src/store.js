import { configureStore } from "@reduxjs/toolkit";
import monthlyClimateDataReducer from "./state/monthlyClimateData/monthlyClimateDataSlice";
import dataLangReducer from "./state/dataLang/dataLangSlice";
import yearsClimateDataReducer from "./state/yearsClimateData/yearsClimateDataSlice";
import coordsReducer from './state/coords/coordsSlice';
import loaderReducer from "./state/loader/loaderSlice";
import weatherSlice from "./state/weather/weatherSlice";

export const store = configureStore({
    reducer: {
        monthlyClimateData: monthlyClimateDataReducer,
        yearsClimateData: yearsClimateDataReducer,
        dataLang: dataLangReducer,
        coords: coordsReducer,
        loader: loaderReducer,
        weather: weatherSlice,
    },
});
