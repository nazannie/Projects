import React from "react";
 import styled from "styled-components";

const CustomButton = styled.button`
  background: #e6e5e0;
  min-width: 80px;
  min-height: 35px;
  border-radius: 8px;
`;

function Button(props) {
  return <CustomButton {...props} />;
}

export default Button;