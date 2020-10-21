import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../styles/footer.css";
import { UserContext } from "../App";
import Message from "../Message/Message";
import { fire } from "../config/fire";

function Footer() {
  let user = useContext(UserContext);

  return (
    <div className="footer">
      <p className="copyright">
        &copy; 2019 All Services in One Place, all rights reserved
      </p>
      {user.admin ? null : fire.auth().currentUser ? <Message /> : null}
    </div>
  );
}

export default Footer;
