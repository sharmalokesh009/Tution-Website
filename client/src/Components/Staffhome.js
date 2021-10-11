import axios from "axios";
import React, { useEffect } from "react"
import {  HashRouter as Router , Link ,useHistory } from "react-router-dom"
import AssignIcon from "../Icons/AssignIcon"

export default function Staffhome(){

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

    return <Router>
        <div className="staffhome-container">
        <div className="staffhome-items">
            <div>
                <Link to='/submitted' >Recently <br/>Submitted</Link>
            </div>
            <div>
                <Link to='/' >Pending <br/> Assignments</Link>
            </div>
            <div>
                <Link to='/' >Student's <br/> List</Link>
            </div>
            <div>
                <Link to='/assign' >Assign<br/><AssignIcon/></Link>
            </div>

        </div>
    </div>
    </Router>
}