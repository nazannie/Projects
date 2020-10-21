import React from "react";
import Button from "./Button";
import { fire } from "../config/fire";
import { NavLink } from "react-router-dom";

function Avatar() {
  return (
    <div className="avatar">
      <NavLink to="/profile">
        <button className="profile-btn"><i class="fas fa-user"></i></button>
      </NavLink>
      <button className="logout-btn"
        onClick={e => {
          e.stopPropagation();
          fire.auth().signOut();
        }}
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
}

export default Avatar;