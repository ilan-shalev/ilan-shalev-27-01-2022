import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrentWeatherActions,
  SetCurrentWeatherAC,
} from "../store/currentWeatherSlice";
import WeatherDetails from "../components/weather/WeatherDetails";

let firstRender = true;

export default function Weather() {
  const dispatch = useDispatch();
  const currWeather = useSelector((root) => root.currentWeather);
  const defaults = useSelector((root) => root.defaults);

  //add useeffect to dispatch first state for weather to be tel aviv.
  useEffect(() => {
    if (firstRender)
      SearchInputHandler({
        key: defaults.defaultCityApiKey,
        label: defaults.defaultCityName,
      });
    firstRender = false;
  }, []);

  const SearchInputHandler = (locationSearched) => {
    dispatch(
      CurrentWeatherActions.setLocation({
        cityKey: locationSearched.key,
        cityName: locationSearched.label,
      })
    );
    dispatch(SetCurrentWeatherAC(locationSearched.key));
  };

  return (
    <>
      <SearchBar text={"Search A City"} onChanged={SearchInputHandler} />
      {currWeather && <WeatherDetails />}
    </>
  );
}
