import React from "react";
import { HashRouter as Router } from "react-router-dom";
import AlltypeAssignments from "./AlltypeAssignments";
import AssignmentNav from "./AssignmentNav";


export default function Assignments() {
  

  return (
    <Router>
      <div className="assignments-container">
        <AssignmentNav />
        <AlltypeAssignments name="Assignments" type="assignments" to='pending'/>
        <AlltypeAssignments name="Declined" type="declined" to='declined'/>
      </div>
    </Router>
  );
}
