import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    fetched: false,
    loading: false,
    PRECTOTCORR: {},
    T2M_MAX: {},
    T2M_MIN: {},
    T2M: {},
    WS2M: {},
    RH2M: {},
    PS: {},
    TS: {},
    FROST_DAYS: {},
    AVERAGES: {},
    parameters: {},
    city: '',
};

const yearsClimateDataSlice = createSlice({
    name: "yearsClimateData",
    initialState,
    reducers: {
        clearYears: () => {
            return initialState;
        },
        setFetchedFalse: (state) => {
            return { ...state, fetched: false };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchYearsClimateData.pending, (state) => {
                console.log("Request is pending...");
                state.loading = true;
            })
            .addCase(fetchYearsClimateData.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchYearsClimateData.rejected, (state, action) => {
                console.error(
                    "Failed to fetch climate data:",
                    action.error.message
                );
            });
    },
});

export const fetchYearsClimateData = createAsyncThunk(
    "yearsClimateData/fetchYearsClimateData",
    async (coordinates) => {
        const { lat, lng, city } = coordinates;
        try {
            const response = await axios.get(
                "http://localhost:5000/api/climate/years",
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
                    loading: false,
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

export const { clearYears, setFetchedFalse } = yearsClimateDataSlice.actions;

export default yearsClimateDataSlice.reducer;
