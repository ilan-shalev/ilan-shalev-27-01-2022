import React from 'react';
import Card from '../generic/Card';
import Styles from './FutureForecast.module.css';

export default function FutureForecast({day, temperature, tempUnit, displayUnit}) {
  const matchDisplay = (temp) =>{
    //F to C
    if(displayUnit === "C" && tempUnit === "F")
      temperature = (temperature - 32) * 5/9;
    //C to F
    if(displayUnit === "F" && tempUnit === "C")
      temperature = (temperature * 9) / 5 + 32;
    return Math.round(temperature); 
  }
  return <Card className={Styles.container}>
      <h3>{day}</h3>
      <h4>{matchDisplay(temperature)}<sup>o</sup>{displayUnit === "C" ? "C" : "F"}</h4>
  </Card>;
}
