import React from "react";

function Notification(props) {
  return (
    <div className="notification">
      <div>{props.message}</div>
    </div>
  );
}

export default Notification;
