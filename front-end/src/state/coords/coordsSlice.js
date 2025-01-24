import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { lat: "", lng: "", city: '' };

const coordsSlice = createSlice({
    name: "coords",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoords.pending, () => {
                console.log("Request is pending...");
            })
            .addCase(fetchCoords.fulfilled, (state, action) => {
                return { ...action.payload };
            })
            .addCase(fetchCoords.rejected, (state, action) => {
                console.error(
                    "Failed to get coordinates:",
                    action.error.message
                );
            });
    },
});

export const fetchCoords = createAsyncThunk(
    "coords/getCoords",
    async (city) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/climate/coords",
                {
                    params: {
                        city: city,
                    },
                }
            );

            if (response.status === 200) {
                return {
                    ...response.data.geometry,
                    city: city,
                }
            } else {
                throw new Error(
                    "За заданою локацією координат не знайдено. Спробуйте іншу локацію"
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

export default coordsSlice.reducer;
