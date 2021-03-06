import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import AssignmentIcon from "../Icons/AssignmentIcon";


export default function AssignmentNav(){

  const history = useHistory();
  useEffect(() => {
    
    axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
      const loggedin = res.data;
      
      if(!loggedin){
        history.push('/')
      }
    })
  },[history])
    return  <div className="assignments-navbar">
    <div className="logo">
      <AssignmentIcon width="50px" height="50px" />
      <h4>ASSIGNMENTS</h4>
    </div>
    <div className="rollno">
      <p>11801053</p>
      <p>3CE-4</p>
    </div>
  </div>
}