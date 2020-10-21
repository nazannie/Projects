import React from "react";

function AlertBox(props) {
  return (
    <div className="alert-box">
      <div>{props.message}</div>
    </div>
  );
}

export default AlertBox;
