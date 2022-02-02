import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorTheme: "light",
  isCelsius: true,
  defaultCityApiKey: '215793',
  defaultCityName: "IL - Tel-aviv Port - Tel Aviv"
};

const DefaultsSlice = createSlice({
    name:'defaultsSlice',
    initialState,
    reducers:{
        changeColorTheme(state){
            state.colorTheme = state.colorTheme === "light" ? "dark" : "light";
        },
        changeTemperatureUnit(state){
            state.isCelsius = !state.isCelsius;
        }
    }
})

export const DefaultsActions = DefaultsSlice.actions;

export default DefaultsSlice;
