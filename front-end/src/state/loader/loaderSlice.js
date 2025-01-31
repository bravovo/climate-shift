import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        toggleLoader: (state, action) => {
            return action.payload;
        },
    }
});

export const { toggleLoader } = loaderSlice.actions;

export default loaderSlice.reducer;