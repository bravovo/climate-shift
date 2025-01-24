import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    city: "",
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
            .addCase(fetchMonthlyClimateData.pending, () => {
                console.log("Request is pending...");
            })
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
            console.log("in monthlySlice", lat, lng);
            const response = await axios.get(
                "http://localhost:5000/api/climate/daily",
                {
                    params: {
                        lat: lat,
                        lng: lng,
                    },
                }
            );

            if (response.status === 200) {
                const { parameters, info, point } = response.data;
                console.log({
                    fetched: true,
                    parameters: parameters,
                    ...info,
                    city: city,
                    lat: point.lat,
                    lng: point.lng,
                });
                return {
                    fetched: true,
                    parameters: parameters,
                    ...info,
                    city: city,
                    lat: point.lat,
                    lng: point.lng,
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
