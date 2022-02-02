import { configureStore } from "@reduxjs/toolkit";
import CurrentWeatherSlice from "./currentWeatherSlice";
import FavoritesSlice from './FavoritesSlice'
import DefaultsSlice from "./DefaultsSlice";
import ErrorSlice from "./ErrorSlice";

const store = configureStore({
    reducer: {
        currentWeather: CurrentWeatherSlice.reducer,        
        favorites: FavoritesSlice.reducer,
        defaults: DefaultsSlice.reducer,
        error: ErrorSlice.reducer
    }
})

export default store;