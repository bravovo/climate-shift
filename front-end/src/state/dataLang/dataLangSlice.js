import { createSlice } from "@reduxjs/toolkit";

const initialState = 'ukr';

const dataLangSlice = createSlice({
    name: 'dataLang',
    initialState,
    reducers: { 
        toggleLang: (state) => {
            return state === 'ukr' ? 'eng' : 'ukr';
        },
        setLang: (state, action) => {
            return action.payload;
        }
    }
});

export const { toggleLang, setLang } = dataLangSlice.actions;

export default dataLangSlice.reducer;