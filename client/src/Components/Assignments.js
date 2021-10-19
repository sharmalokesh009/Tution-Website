import axios from "axios";
import React, { useEffect } from "react";
import { HashRouter as Router, useHistory } from "react-router-dom";
import AlltypeAssignments from "./AlltypeAssignments";
import AssignmentNav from "./AssignmentNav";


export default function Assignments() {
  
const history = useHistory();
useEffect(() => {
    
  axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
    const loggedin = res.data;
    console.log(res);
    if(!loggedin){
      history.push('/')
    }
  })
},[history])
  return (
    <Router>
      <div className="assignments-container">
        <AssignmentNav />
        <AlltypeAssignments name="Pending" type="assignments" to='pending'/>
        <AlltypeAssignments name="Declined" type="declined" to='declined'/>
        <AlltypeAssignments name="Approved" type="approved" to='approved'/>
      </div>
    </Router>
  );
}
