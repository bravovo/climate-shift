import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const initialState = {
    current: {
        coord: {},
        weather: [],
        base: "",
        main: {},
        visibility: null,
        wind: {},
        clouds: {},
        dt: null,
        sys: {},
        timezone: "",
        id: null,
        name: "",
        cod: null,
        fetched: false,
        cityName: "",
    },
    forecast: {
        cod: "",
        message: null,
        cnt: null,
        list: [],
        city: {},
        cityName: "",
        fetched: false,
    },
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setFetchedFalse: (state) => {
            const current = {...state.current, fetched: false};
            const forecast = { ...state.forecast, fetched: false };
            return { current: current, forecast: forecast };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeather.pending, () => {
                console.log("current is pending...");
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchCurrentWeather.rejected, (state, action) => {
                console.error(
                    "Failed to fetch weather data:",
                    action.error.message
                );
            })
            .addCase(fetchForecast.pending, () => {
                console.log("forecast is pending...");
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                console.error(
                    "Failed to fetch forecast data:",
                    action.error.message
                );
            });
    },
});

export const fetchCurrentWeather = createAsyncThunk(
    "weather/current",
    async (coordinates) => {
        const { lat, lng, city } = coordinates;

        try {
            const openWeatherResponse = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        lat: lat,
                        lon: lng,
                        units: "metric",
                        lang: "uk",
                        appid: OPEN_WEATHER_API_KEY,
                    },
                }
            );

            if (openWeatherResponse) {
                const current = {
                    ...openWeatherResponse.data,
                    fetched: true,
                    cityName: city,
                };
                return { current: current };
            } else {
                return {};
            }
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                return { message: error.response.message };
            } else {
                return { message: "Something went wrong" };
            }
        }
    }
);

export const fetchForecast = createAsyncThunk(
    "weather/forecast",
    async (coordinates) => {
        const { lat, lng, city } = coordinates;

        try {
            const openWeatherResponse = await axios.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                {
                    params: {
                        lat: lat,
                        lon: lng,
                        units: "metric",
                        lang: "uk",
                        appid: OPEN_WEATHER_API_KEY,
                    },
                }
            );

            if (openWeatherResponse) {
                const forecast = {
                    ...openWeatherResponse.data,
                    fetched: true,
                    cityName: city,
                };
                return { forecast: forecast };
            } else {
                return {};
            }
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                return { message: error.response.message };
            } else {
                return { message: "Something went wrong" };
            }
        }
    }
);

export const { setFetchedFalse } = weatherSlice.actions;

export default weatherSlice.reducer;
