import axios from "axios";
import React, { useEffect } from "react"
import { useHistory } from "react-router";
import AssignmentList from "./AssignmentList";
import AssignmentNav from "./AssignmentNav";

export default function Declined(){

    axios.defaults.withCredentials = true;
const history = useHistory();
  useEffect(() => {
    axios.get('https://tuitionwebsite.herokuapp.com/studentlogins').then(res => {
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
        <AssignmentList type="declined" name="Declined Assignments" array="declined" approved={false}  />
    </div>
}