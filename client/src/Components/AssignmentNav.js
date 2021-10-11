import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import AssignmentIcon from "../Icons/AssignmentIcon";


export default function AssignmentNav(){
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