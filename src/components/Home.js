import React from "react";
import { Redirect } from "react-router-dom";

const Home = () => (
  <div>
    <Redirect to="/all" />
  </div>
);

export default Home;
