import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState = {
    fetched: false,
    PRECTOTCORR: {},
    T2M_MAX: {},
    T2M_MIN: {},
    T2M: {},
    WS2M: {},
    RH2M: {},
    PS: {},
    TS: {},
    FROST_DAYS: {},
    MAX: {},
    MIN: {},
    AVERAGES: {},
    frostDays: {},
    parameters: {},
    city: ''
};

const monthlyClimateDataSlice = createSlice({
    name: "monthlyClimateData",
    initialState,
    reducers: {
        clearMonthly: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonthlyClimateData.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchMonthlyClimateData.rejected, (state, action) => {
                console.error(
                    "Failed to fetch climate data:",
                    action.error.message
                );
            });
    },
});

export const fetchMonthlyClimateData = createAsyncThunk(
    "monthlyClimateData/fetchMonthlyClimateData",
    async (coordinates) => {
        const { lat, lng, city } = coordinates;
        try {
            const response = await axios.get(
                `${SERVER_BASE_URL}/api/climate/daily`,
                {
                    params: {
                        lat: lat,
                        lng: lng,
                    },
                }
            );

            if (response.status === 200) {
                const { parameters, info, point } = response.data;
                return {
                    fetched: true,
                    parameters: parameters,
                    ...info,
                    lat: point.lat,
                    lng: point.lng,
                    city: city,
                };
            } else {
                throw new Error(
                    "За заданою локацією даних не знайдено. Спробуйте іншу локацію"
                );
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    return error.response.data.message || "Помилка на сервері";
                } else {
                    return error.response.data.message || "Щось пішло не так";
                }
            } else {
                return error.message || "Щось пішло не так";
            }
        }
    }
);

export const { clearMonthly } = monthlyClimateDataSlice.actions;

export default monthlyClimateDataSlice.reducer;
