import React from "react";
import Styles from "./WeatherSummary.module.css";

export default function WeatherSummary({
  cityName,
  iconKey,
  degrees,
  isCelsius,
}) {
  return (
    <div className={Styles.container}>
      <span className={Styles.icon}>
        {iconKey !== 0 && <img
          src={`https://developer.accuweather.com/sites/default/files/${iconKey < 10 ? "0":''}${iconKey}-s.png`}
        />}
      </span>
      <div className={Styles.textArea}>
        <h4>{cityName}</h4>
        <h5>
          {Math.round(degrees)}<sup>o</sup>{isCelsius ? "C" : "F"}
        </h5>
      </div>
    </div>
  );
}
