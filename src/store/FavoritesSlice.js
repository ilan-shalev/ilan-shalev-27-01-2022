import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteCities: [],
};

const FavoritesSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    addCity(state, action) {
      const city = action.payload;
      if (!state.favoriteCities.includes(city)) state.favoriteCities.push(city);
    },
    removeCity(state, action) {
      const cityKey = action.payload;
      state.favoriteCities = state.favoriteCities.filter(
        (c) => c.cityKey !== cityKey
      );
    },
  },
});

export const FavoritesActions = FavoritesSlice.actions;

export default FavoritesSlice;
