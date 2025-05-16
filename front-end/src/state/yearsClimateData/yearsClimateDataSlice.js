import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

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
    city: "",
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchYearsClimateData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchYearsClimateData.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
    },
});

export const fetchYearsClimateData = createAsyncThunk(
    "yearsClimateData/fetchYearsClimateData",
    async (coordinates) => {
        const { lat, lng, city } = coordinates;
        try {
            const response = await axios.get(
                `${SERVER_BASE_URL}/api/climate/years`,
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
                    return {
                        message:
                            error.response.data.message || "Помилка на сервері",
                        loading: false,
                        fetched: false,
                    };
                } else {
                    return {
                        message:
                            error.response.data.message || "Щось пішло не так",
                        loading: false,
                        fetched: false,
                    };
                }
            } else {
                return error.message || "Щось пішло не так";
            }
        }
    }
);

export const { clearYears, setFetchedFalse } = yearsClimateDataSlice.actions;

export default yearsClimateDataSlice.reducer;
