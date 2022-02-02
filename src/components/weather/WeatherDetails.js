import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherSummary from "./WeatherSummary";
import Styles from "./WeatherDetails.module.css";
import { Button } from "react-bootstrap";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { FavoritesActions } from "../../store/FavoritesSlice";
import Card from "../generic/Card";
import FutureForecast from "./FutureForecast";

export default function WeatherDetails(props) {
  const dispatch = useDispatch();
  const weatherState = useSelector((root) => root.currentWeather);
  const defaults = useSelector((root) => root.defaults);
  const theme = useSelector(root => root.defaults.colorTheme);

  const isInFavorites =
    useSelector((root) => root.favorites.favoriteCities.find(
      (c) => c.cityKey === weatherState.cityKey
    )) !== undefined;

  const addToFavoritesHandler = () => {
    !isInFavorites ?
      dispatch(FavoritesActions.addCity(weatherState)) :
      dispatch(FavoritesActions.removeCity(weatherState.cityKey))
  };
  const next5ForecastCards = weatherState.futureForecast.map((forecast) => (
    <FutureForecast
      key={forecast.day}
      day={forecast.day}
      temperature={forecast.temperature}
      tempUnit={forecast.tempUnit}
      displayUnit={defaults.isCelsius ? "C" : "F"}
    />
  ));
  return (
    <Card className={`${Styles.cardWrap} ${theme}`} >
      <div className={Styles.container}>
        <WeatherSummary
          cityName={weatherState.cityName}
          iconKey={weatherState.weatherIconKey}
          degrees={defaults.isCelsius ? weatherState.temperatureC : weatherState.temperatureF}
          isCelsius={defaults.isCelsius}
        />
        <div>
          <Button
            variant={isInFavorites ?  "danger" : "dark"}
            className={Styles.favoritesButton}
            onClick={addToFavoritesHandler}            
          >
            <BsFillBookmarkHeartFill className={Styles.favoritesIcon} />
            {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
          </Button>
        </div>
      </div>
      <h1>{weatherState.forecast}</h1>
      <div className={Styles.futureForecastContainer}>{next5ForecastCards}</div>
    </Card>
  );
}
