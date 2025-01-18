import { createSlice } from "@reduxjs/toolkit";

const initialState = 'ukr';

const dataLangSlice = createSlice({
    name: 'dataLang',
    initialState,
    reducers: { 
        toggleLang: (state) => {
            return state === 'ukr' ? 'eng' : 'ukr';
        }
    }
});

export const { toggleLang } = dataLangSlice.actions;

export default dataLangSlice.reducer;