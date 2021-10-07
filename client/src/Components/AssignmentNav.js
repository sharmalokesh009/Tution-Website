import React from "react";
import AssignmentIcon from "../Icons/AssignmentIcon";


export default function AssignmentNav(){
    return  <div className="assignments-navbar">
    <div className="logo">
      <AssignmentIcon width="50px" height="50px" />
      <h4>ASSIGNMENTS</h4>
    </div>
    <div className="rollno">
      <p>11801092</p>
      <p>3CE-4</p>
    </div>
  </div>
}