import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../styles/add.css";

const Addingpost = styled.header`
  text-align: center;
  font-family: "Open Sans Condensed", sans-serif;
  letter-spacing: 0.5px;
`;

function Add() {
  return (
    <Addingpost>
      <div className="add-container">
        <p className="want-to-serve">Do you offer a service?</p>

        <NavLink to="/profile">
          <button className="add-button">
            Click here to add your suggestion
          </button>
        </NavLink>
      </div>
    </Addingpost>
  );
}

export default Add;
