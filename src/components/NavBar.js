import React from "react";
import NavItem from "./NavItem";

const navItems = [
  "Salads",
  "Soups",
  "Main",
  "Sides",
  "Drinks",
  "Desserts",
  "Misc",
  "All",
  "Create New Recipe"
];

const NavBar = () => (
  <div>
    <ul>{navItems.map(navItem => <NavItem key={navItem} text={navItem} />)}</ul>
  </div>
);

export default NavBar;
