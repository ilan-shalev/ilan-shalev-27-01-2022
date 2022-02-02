import React from "react";
import Styles from "./Header.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
  const theme = useSelector(r => r.defaults.colorTheme);

  return (
    <Navbar bg={theme} variant={theme} className={Styles.header} >
      <Container>
        <Navbar.Brand>
          Abra Weather
        </Navbar.Brand>
        <Nav className={Styles.navigation}>
            <NavLink className={Styles.nav} activeClassName={Styles.active} to={"/weather"}>Weather</NavLink>
            <NavLink className={Styles.nav} activeClassName={Styles.active} to={"/favorites"}>Favorites</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

{
  /* <>
<header className={Styles.header}>
  <h1>Abra Weather</h1>                      
   <Navigation />  
</header>

<div className={Styles["main-image"]}>
  <img alt="" src={WeatherImage} /> 
</div>
</> */
}
