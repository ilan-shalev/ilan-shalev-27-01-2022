import React from "react";
import Card from "../generic/Card";
import Styles from "./Favorite.module.css";

export default function Favorite({
  cityName,
  forecast,
  temperature,
  isCelsius,
  onClick,
}) {
  const selectedHandler = (e) => {
    onClick(cityName);
  };
  return (
    <div className={Styles.container}>
      <Card onClick={selectedHandler}>
        <h3>{cityName}</h3>
        <h4>
          {Math.round(temperature)}
          <sup>o</sup>
          {isCelsius ? "C" : "F"}
        </h4>
        <br />
        <h4>{forecast}</h4>
      </Card>
    </div>
  );
}
