import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import logo from "../files/logo.png";
import "../styles/header.css";
import { UserContext } from "../App";

function Header() {
  let user = useContext(UserContext);

  useEffect(() => {});

  return (
    <div className="header-container">
      <header className="home-header">
        <div className="logo">
          <NavLink to="/home">
            <img src={logo} className="home-logo" alt="logo" />
          </NavLink>
        </div>
        <div className="login-avatar">
          {user.signedIn ? (
            <>
              <Avatar />
            </>
          ) : (
            <>
              <NavLink className="header-links" to="/login">Log in</NavLink>
              <NavLink className="header-links" to="/singup">Sign up</NavLink>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
