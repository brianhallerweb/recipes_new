import React from "react";
import { NavLink } from "react-router-dom";

const Title = () => (
  <h3>
    <NavLink to="/" exact={true}>
      Recipes App
    </NavLink>
  </h3>
);

export default Title;
