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
        loading: false,
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
        loading: false,
    },
    lat: null, 
    lng: null,
    lang: 'ukr',
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        clearWeather: () => {
            return initialState;
        },
        setFetchedFalse: (state) => {
            const current = {...state.current, fetched: false};
            const forecast = { ...state.forecast, fetched: false };
            return { current: current, forecast: forecast };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeather.pending, (state) => {
                console.log("current is pending...");
                state.current.loading = true;
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
            .addCase(fetchForecast.pending, (state) => {
                console.log("forecast is pending...");
                state.forecast.loading = true;
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
    async ({coordinates, lang}) => {
        const { lat, lng, city } = coordinates;

        try {
            const openWeatherResponse = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        lat: lat,
                        lon: lng,
                        units: "metric",
                        lang: lang === 'eng' ? 'en' : 'uk',
                        appid: OPEN_WEATHER_API_KEY,
                    },
                }
            );

            if (openWeatherResponse) {
                const current = {
                    ...openWeatherResponse.data,
                    fetched: true,
                    loading: false, 
                    cityName: city,
                };
                return { current: current, lat: lat, lng: lng, lang: lang };
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
    async ({coordinates, lang}) => {
        const { lat, lng, city } = coordinates;

        try {
            const openWeatherResponse = await axios.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                {
                    params: {
                        lat: lat,
                        lon: lng,
                        units: "metric",
                        lang: lang === 'eng' ? 'en' : 'uk',
                        appid: OPEN_WEATHER_API_KEY,
                    },
                }
            );

            if (openWeatherResponse) {
                const forecast = {
                    ...openWeatherResponse.data,
                    fetched: true,
                    loading: false,
                    cityName: city,
                };
                return { forecast: forecast, lat: lat, lng: lng, lang: lang };
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

export const { clearWeather, setFetchedFalse } = weatherSlice.actions;

export default weatherSlice.reducer;
