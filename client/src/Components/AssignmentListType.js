import axios from "axios";
import React, { useEffect } from "react"
import { useHistory } from "react-router";
import AssignmentList from "./AssignmentList";
import AssignmentNav from "./AssignmentNav";

export default function AssignmentListType(){
    axios.defaults.withCredentials = true;
    const history = useHistory();
      useEffect(() => {
        axios.get('http://localhost:5000/studentlogins').then(res => {
          const loggedin = res.data.loggedin;
          if(!loggedin){
            history.push('/')
          }
        })
      },[history])
    return <div>
        <AssignmentNav />
        <br />
        <br />
        <AssignmentList type="assignments" name="Assignments" />
    </div>
}