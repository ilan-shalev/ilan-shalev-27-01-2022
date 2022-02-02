import React from "react";
import Styles from "./Footer.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { DefaultsActions } from "../store/DefaultsSlice";
import { BsSun, BsMoonStars } from "react-icons/bs";

export default function Footer() {
  const dispatch = useDispatch();
  const isCelsius = useSelector((root) => root.defaults).isCelsius;
  const colorTheme = useSelector((root) => root.defaults).colorTheme;

  return (
    <div className={Styles.container}>
      <ToggleButton
        selected
        value="tempUnit"
        className={Styles.action}
        onChange={() => {
          dispatch(DefaultsActions.changeTemperatureUnit());
        }}
      >
        {isCelsius ? "C" : "F"}
      </ToggleButton>

      <ToggleButton
        selected
        value="colorTheme"
        className={Styles.action}
        onChange={() => {
          dispatch(DefaultsActions.changeColorTheme());
        }}
      >
        {colorTheme === "light" ? <BsSun /> : <BsMoonStars />}
      </ToggleButton>
    </div>
  );
}
