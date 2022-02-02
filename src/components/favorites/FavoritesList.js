import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Favorite from "./Favorite";
import Styles from "./FavoritesList.module.css";
import { useHistory } from "react-router-dom";
import { CurrentWeatherActions } from "../../store/currentWeatherSlice";

export default function FavoritesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((root) => root.favorites.favoriteCities);
  const isCelsius = useSelector((root) => root.defaults.isCelsius);

  const onFavoriteSelected = (cityName) => {
    const cityModel = favorites.find((c) => c.cityName === cityName);
    dispatch(
      CurrentWeatherActions.setLocation({
        cityKey: cityModel.cityKey,
        cityName: cityModel.cityName,
      })
    );
    dispatch(
      CurrentWeatherActions.setCurrentWeather({
        temperatureC: cityModel.temperatureC,
        forecast: cityModel.forecast,
        weatherIconKey: cityModel.weatherIconKey
      })
    );
    dispatch(CurrentWeatherActions.AddFutureForecasts([...cityModel.futureForecast]));

    history.replace("/weather");
  };

  return (
    <div className={Styles.container}>
      {favorites.length === 0 && <h2> No Favorites Yet</h2>}
      {favorites.map((fav) => {
        return (
          <Favorite
            cityName={fav.cityName}
            forecast={fav.forecast}
            key={fav.cityName}
            temperature={isCelsius ? fav.temperatureC : fav.temperatureF}
            isCelsius={isCelsius}
            onClick={onFavoriteSelected}
          />
        );
      })}
    </div>
  );
}
