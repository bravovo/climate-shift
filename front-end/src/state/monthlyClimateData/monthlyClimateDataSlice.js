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
    CLOUD_AMT: {},
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
        clear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonthlyClimateData.pending, () => {
                console.log("Request is pending...");
            })
            .addCase(fetchMonthlyClimateData.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            }).addCase(fetchMonthlyClimateData.rejected, (state, action) => {
                console.error("Failed to fetch climate data:", action.error.message);
            });
    },
});

export const fetchMonthlyClimateData = createAsyncThunk(
    "monthlyClimateData/fetchMonthlyClimateData",
    async (city = null, lat = null, lng = null) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/climate/daily",
                {
                    params:
                        city === null
                            ? {
                                  lat: lat,
                                  lng: lng,
                              }
                            : {
                                  city: city,
                              },
                }
            );

            if (response.status === 200) {
                const { parameters, info } = response.data;
                console.log(response.data);
                console.log({
                    fetched: true,
                    parameters: parameters,
                    ...info,
                    city: city
                });
                return {
                    fetched: true,
                    parameters: parameters,
                    ...info,
                    city: city
                };
            } else {
                throw new Error("За заданою локацією даних не знайдено. Спробуйте іншу локацію");
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

export const { clear } = monthlyClimateDataSlice.actions;

export default monthlyClimateDataSlice.reducer;
