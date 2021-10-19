import React, { useEffect } from "react";
import AssignmentIcon from "../Icons/AssignmentIcon";
import { HashRouter as Router, Link , useHistory } from "react-router-dom";
import FeeIcon from "../Icons/FeeIcon";
import InfoIcon from "../Icons/InfoIcon";
import axios from "axios";

export default function Studenthome() {

const history = useHistory();
useEffect(() => {

  axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
    const loggedin = res.data;
    if(!loggedin){
      history.push('/')
    }
  })
},[history])
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
