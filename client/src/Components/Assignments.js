import axios from "axios";
import React, { useEffect } from "react";
import { HashRouter as Router, useHistory } from "react-router-dom";
import AlltypeAssignments from "./AlltypeAssignments";
import AssignmentNav from "./AssignmentNav";


export default function Assignments() {
  
  axios.defaults.withCredentials = true;
const history = useHistory();
  useEffect(() => {
    axios.get('http://localhost:5000/studentlogins').then(res => {
      const loggedin = res.data.loggedin;
      if(!loggedin){
        history.push('/')
      }
    })
  },[])
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
