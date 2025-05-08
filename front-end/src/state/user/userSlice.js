import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState = {
    email: "",
    lat: null,
    lng: null,
    city: '',
    lang: "ukr",
    loading: false,
    feched: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return { ...action.payload, loading: false, fetched: true };
        },
        logoutUser: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserExist.pending, (state) => {
                state.loading = true;
                state.fetched = false;
                console.log("User session is pending");
            })
            .addCase(checkUserExist.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(checkUserExist.rejected, (state, action) => {
                console.error(
                    "Failed to fetch weather data:",
                    action.error.message
                );
                return initialState;
            });
    },
});

export const checkUserExist = createAsyncThunk("user/getUser", async () => {
    try {
        const serverResponse = await axios.get(
            `${SERVER_BASE_URL}/api/auth/user`,
            { withCredentials: true }
        );

        if (serverResponse) {
            return { ...serverResponse.data, loading: false, fetched: true };
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
            return {
                message: error.response.data.message,
                loading: false,
                fetched: true,
            };
        } else {
            console.log(error.message);
            return { message: error.message, loading: false, fetched: true };
        }
    }
});

export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
