import React from "react";
import "./error.css";
import img from "../../../assets/404.svg";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div>
        <img src={img} alt="not-found" />
        <p>This page doesn't exist</p>
        <NavLink to={"/"}>
          {" "}
          <p>Please check your URL or return to LinkedIn home.</p>
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;

// Something went wrong
// We’re having issues loading the page.

// Go to your feed
