import React from "react";

export default function PopUp(props) {
  return (
    <div className="popup">
      <div>{props.icon}</div>
      <br />
      <h2>{props.text}</h2>
    </div>
  );
}
