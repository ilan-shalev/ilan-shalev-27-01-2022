import { createSlice } from "@reduxjs/toolkit";
import { getCurrentWeather, fetchNext5DaysForecast } from "../api/accuWeather";
import { ErrorActions } from "./ErrorSlice";

const initialState = {
  cityKey: 0, // the city key in the api
  cityName: "",
  temperatureC: 0,
  temperatureF: 0,
  forecast: "", // the description (sunny, scattered clouds)
  weatherIconKey: 0,
  futureForecast: [], // next x days of forecast
};

const CurrentWeatherSlice = createSlice({
  name: "currentWeatherSlice",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.cityKey = action.payload.cityKey;
      state.cityName = action.payload.cityName;
    },
    setCurrentWeather(state, action) {
      state.temperatureC = action.payload.temperatureC;
      state.temperatureF = (state.temperatureC * 9) / 5 + 32;
      state.forecast = action.payload.forecast;
      state.weatherIconKey = action.payload.weatherIconKey;
    },
    AddFutureForecasts(state, action) {
      state.futureForecast = action.payload;
    },
  },
});

export const CurrentWeatherActions = CurrentWeatherSlice.actions;

//AC suffix - action creator
export const SetCurrentWeatherAC = (cityKey) => {
  return async (dispatch) => {
    try {
      const currWeather = await getCurrentWeather(cityKey);
      dispatch(
        CurrentWeatherActions.setCurrentWeather({
          temperatureC: currWeather.Temperature.Metric.Value,
          forecast: currWeather.WeatherText,
          weatherIconKey: currWeather.WeatherIcon,
        })
      );
      const next5Days = await fetchNext5DaysForecast(cityKey);
      dispatch(CurrentWeatherActions.AddFutureForecasts(next5Days));
    } catch (e) {
      dispatch(ErrorActions.setError(e));
    }
  };
};

export default CurrentWeatherSlice;
