import axios from "axios";
import React, { useEffect } from "react"
import { useHistory } from "react-router";
import AssignmentList from "./AssignmentList";
import AssignmentNav from "./AssignmentNav";

export default function Approved(){

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

    return <div>
        <AssignmentNav />
        <br />
        <br />
        <AssignmentList type="approved" name="Approved Assignments" array="approved" approved={true} />
    </div>
}