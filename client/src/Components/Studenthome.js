import React from "react";
import AssignmentIcon from "../Icons/AssignmentIcon";
import { HashRouter as Router, Link } from "react-router-dom";
import FeeIcon from "../Icons/FeeIcon";
import InfoIcon from "../Icons/InfoIcon";

export default function Studenthome() {
  return (
    <Router>
      <div className="studentinterface-container">
        <div className="options">
          <div>
            <AssignmentIcon height="74px" width="74px" />
            <Link to="/assignments">ASSIGNMENTS</Link>
          </div>
          <div>
            <FeeIcon />
            <Link to="/fee">PAYMENTS</Link>
          </div>
          <div>
            <InfoIcon />
            <Link to="/info">STUDENT INFO</Link>
          </div>
        </div>
      </div>
    </Router>
  );
}
