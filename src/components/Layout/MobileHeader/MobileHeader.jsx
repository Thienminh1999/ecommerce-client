import React from "react";
import styles from "./MobileHeader.module.css";
import { NavLink } from "react-router-dom";

function MobileHeader(props) {
  const handleOnClick = (event) => {
    const menu = document.getElementById("list-menu");
    if (menu.style.display === "none") {
      menu.style.display = "grid";
    } else {
      menu.style.display = "none";
    }
  };
  return (
    <div className={styles.container}>
      <h5>Boutique</h5>
      <button onClick={handleOnClick}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul id="list-menu">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/shoppage"
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/cart"
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MobileHeader;
