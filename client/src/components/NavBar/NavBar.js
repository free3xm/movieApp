import React from "react";
import cls from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav className={cls.NavBar}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Auth">Sign Up</NavLink>
    </nav>
  );
}
